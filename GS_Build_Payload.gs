function buildPayload(metadata, source) {
  var boundary, data, payload;
      
  boundary = "--xxxxxxxxxx\r\n";
  
  data = boundary;
  data += "Content-Disposition: form-data; name=\"metadata\";\r\n";
  data += "Content-Type: application/json; charset=UTF-8\r\n\r\n";
  data += JSON.stringify(metadata) + "\r\n";
  data += boundary;
  data += "Content-Disposition: form-data; name=\"file\"; filename=\"" + (metadata.name || 'samplename') + "\"\r\n";
  data += "Content-Type: application/vnd.google-apps.script+json\r\n\r\n";
  data += JSON.stringify(source) + "\r\n";
  data += boundary;
  payload = Utilities.newBlob(data).getBytes();
  
  return payload;
}
