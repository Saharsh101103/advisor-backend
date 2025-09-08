INSERT Enrollment {
  student := (
    SELECT Student
    FILTER .user.serial_id = <int64>$student_id
    LIMIT 1
  ),
  course := (
    SELECT Course
    FILTER .serial_id = <int64>$course_id
    LIMIT 1
  ),
  instructor := (
    SELECT Advisor
    FILTER .user.serial_id = <int64>$instructor_id
    LIMIT 1
  ),
  status := <optional CourseStatus>$status,    # "UPCOMING", "IN_PROGRESS", "COMPLETED"
  progress := <optional int16>$progress
};

