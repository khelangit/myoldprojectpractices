Oversized backup ZIP files were split into GitHub-compatible parts.

To restore them after download:

```bash
cat "srashtasoft/02:26 Srashtasoft-Backup.zip.00.part" \
    "srashtasoft/02:26 Srashtasoft-Backup.zip.01.part" \
    > "srashtasoft/02:26 Srashtasoft-Backup.zip"

cat "test-srashtasoft/02:26 Srashtasoft-Backup.zip.00.part" \
    "test-srashtasoft/02:26 Srashtasoft-Backup.zip.01.part" \
    > "test-srashtasoft/02:26 Srashtasoft-Backup.zip"
```
