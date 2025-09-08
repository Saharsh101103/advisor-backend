SELECT Course {
    *,
    prerequisites: {
        serial_id
      }
  }
FILTER .is_deleted = false
