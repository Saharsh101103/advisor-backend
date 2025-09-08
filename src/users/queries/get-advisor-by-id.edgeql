
WITH
  advisor_id := <uuid>$advisor_id,
  advisor := (SELECT Advisor FILTER .id = advisor_id LIMIT 1),

  students := (
    SELECT Student {
      serial_id:=.user.serial_id,
      name := .user.name,
      major,
      gpa,
      enrollment_year,
      required_credits,
      completed_credits,

      lastMeeting := (
        SELECT AdvisingMeeting.date
        FILTER 
          .status = "COMPLETED"
        ORDER BY .date DESC
        LIMIT 1
      ),

      nextMeeting := (
        SELECT AdvisingMeeting.date
        FILTER .student = Student
          AND .status = "SCHEDULED"
          AND .date > datetime_current()
        ORDER BY .date ASC
        LIMIT 1
      ),

      advisingStatus := (
        if EXISTS (
          SELECT AdvisingMeeting
          FILTER .student = Student
            AND .status = "COMPLETED"
        )
        then "completed"
        else if EXISTS (
          SELECT AdvisingMeeting
          FILTER .student = Student
            AND .status = "SCHEDULED"
            AND .date > datetime_current()
        )
        then "scheduled"
        else "pending"
      ),

      alerts := array_agg((
        if .gpa < 3.0 then "Low GPA warning"
        else if .completed_credits < (.required_credits / 2)
        then "Graduation check needed"
        else <str>{}
      ))
    }
    FILTER .advisor = advisor
  )

SELECT students;

