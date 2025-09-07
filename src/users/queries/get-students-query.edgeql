SELECT Student {
  *,
  advisor: {
    user: {
      name 
    }
  },
  user: {
    serial_id,
    name,
    email
    }
}
FILTER .is_deleted = false
