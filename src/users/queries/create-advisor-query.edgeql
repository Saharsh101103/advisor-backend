INSERT Advisor{
  department := <str>$department,
    office := <optional str>$office,
    office_hours := <optional str>$office_hours,
    phone := <optional str>$phone,  
  user := (
    SELECT User
    FILTER .id= <uuid>$user_id
    LIMIT 1
  ),
  role := "ADVISOR",
};
