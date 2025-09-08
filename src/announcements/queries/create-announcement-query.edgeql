INSERT Announcement {
    title := <str>$title,
    content := <str>$content,
    date := datetime_current(),
    author := (SELECT User FILTER .serial_id = <int64>$author LIMIT 1)
  }
