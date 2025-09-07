SELECT Advisor {
  *,
  user: {
    serial_id,
    name,
    email
  },
  students := .<advisor[IS Student].user {
    serial_id,
  }
}
FILTER .is_deleted = false
