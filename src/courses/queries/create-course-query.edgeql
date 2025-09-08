INSERT Course {
  code := <str>$code,
  title := <str>$title,
  credits := <int16>$credits,
  prerequisites := (
    SELECT DETACHED Course
    FILTER .serial_id IN array_unpack(<optional array<int64>>$prerequisites)
  ),
  description := <str>$description,
};

