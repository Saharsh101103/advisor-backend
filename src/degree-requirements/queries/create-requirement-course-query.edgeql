WITH course := (SELECT Course FILTER .serial_id= <int64>$course_id LIMIT 1)
INSERT CourseRequirement {
  course := course,
  status := <CourseStatus>$status,
};
