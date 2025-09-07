INSERT Student {
  major := <str>$major,
  enrollment_year := <int16>$enrollment_year,
  expected_graduation := <int16>$expected_graduation,
  gpa := <float32>$gpa,
  completed_credits := <int16>$completed_credits,
  required_credits := <int16>$required_credits,
  advisor := (
    SELECT Advisor
    FILTER .user.email = <str>$advisor_email
    LIMIT 1
  ),
  user := (
    SELECT User
    FILTER .id= <uuid>$user_id
    LIMIT 1
  ),
  role := "STUDENT",
};
