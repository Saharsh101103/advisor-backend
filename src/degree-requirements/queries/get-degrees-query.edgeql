SELECT DegreeRequirement {
  serial_id,
  major,
  total_credits,
  categories: {
    serial_id,
    name,
    required_credits,
    completed_credits,
    courses: {
      serial_id,
      status,
      course: {
        serial_id,
        code,
        title,
        credits,
        description,
        prerequisites: { serial_id }  # or adjust depending on schema
      }
    }
  }
};

