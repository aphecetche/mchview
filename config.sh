#!/bin/sh

cat << EOF > config.js
window.env = {
  CCDB_JSON_API: "${CCDB_JSON_API:-http://localhost:4343}",
  MCH_MAPPING_API: "${MCH_MAPPING_API:-http://localhost:3333}"
}
EOF

cat config.js

nginx -g "daemon off;"
