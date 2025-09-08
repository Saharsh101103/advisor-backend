WITH
  req_courses := (
    SELECT CourseRequirement
    FILTER .serial_id IN array_unpack(<array<int64>>$courses)
  )
INSERT RequirementCategory {
  name := <str>$name,
  required_credits := <int16>$required_credits,
  completed_credits := <int16>$completed_credits,
  courses := req_courses
};

