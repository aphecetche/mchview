#!/bin/sh

echo "In config.sh. Env="

printenv

dest=/usr/share/nginx/html/config.js

cat << EOF > ${dest}
window.env = {
  CCDB_JSON_API: "${CCDB_JSON_API:-http://localhost:4343}",
  MCH_MAPPING_API: "${MCH_MAPPING_API:-http://localhost:3333}"
}
EOF

cat ${dest}

nginx -g "daemon off;"
