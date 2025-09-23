# SendGrid DNS Records for sellerprep.app

Add these to Namecheap Advanced DNS:

## CNAME Records:
- Type: CNAME | Host: `url4906` | Value: `sendgrid.net`
- Type: CNAME | Host: `55900153` | Value: `sendgrid.net`  
- Type: CNAME | Host: `em5876` | Value: `u55900153.wl154.sendgrid.net`
- Type: CNAME | Host: `s1._domainkey` | Value: `s1.domainkey.u55900153.wl154.sendgrid.net`
- Type: CNAME | Host: `s2._domainkey` | Value: `s2.domainkey.u55900153.wl154.sendgrid.net`

## TXT Record:
- Type: TXT | Host: `_dmarc` | Value: `v=DMARC1; p=none;`

Note: In Namecheap, don't include `.sellerprep.app` in the Host field - just use the subdomain part.