SELECT Announcement {
    *,
    author: {
          name
      }
  }
FILTER .is_deleted = false
