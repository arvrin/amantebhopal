# Deployment Backup Strategy for Amante Coming Soon

## Current Issue
**Date**: October 20, 2025
**Status**: Vercel outage in iad1 region causing deployment failures
**Impact**: Cannot deploy updates to production

## Multi-Platform Deployment Strategy

### Option 1: Netlify (Primary Backup)
**Setup Time**: 5-10 minutes
**Reliability**: 99.99% uptime SLA

#### Quick Deploy Steps:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

#### Permanent Setup:
1. Connect GitHub repo to Netlify dashboard
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Set custom domain: `amante-coming-soon.netlify.app`
4. Add domain alias to point to your actual domain

**Pros**:
- Instant rollback capability
- Branch previews
- Edge functions support
- Similar pricing to Vercel

**Cons**:
- May need to adjust some Next.js configurations

---

### Option 2: Cloudflare Pages (Free Alternative)
**Setup Time**: 5-10 minutes
**Reliability**: Cloudflare's global CDN

#### Quick Deploy Steps:
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npx @cloudflare/next-on-pages@1
wrangler pages deploy .vercel/output/static
```

#### Permanent Setup:
1. Connect GitHub repo in Cloudflare dashboard
2. Select "Next.js (Static HTML Export)" framework
3. Build command: `npx @cloudflare/next-on-pages`
4. Build output directory: `.vercel/output/static`

**Pros**:
- Free tier is generous
- Cloudflare's CDN is incredibly fast
- DDoS protection included
- Works well with static exports

**Cons**:
- Dynamic routes need special handling
- Some Next.js features may need adapters

---

### Option 3: AWS Amplify (Enterprise Backup)
**Setup Time**: 10-15 minutes
**Reliability**: 99.99% SLA with AWS backing

#### Quick Deploy Steps:
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure
amplify configure

# Initialize and deploy
amplify init
amplify publish
```

**Pros**:
- AWS infrastructure reliability
- Easy integration with other AWS services
- Good for scaling

**Cons**:
- More complex setup
- Potentially higher costs
- Steeper learning curve

---

### Option 4: Railway (Developer-Friendly)
**Setup Time**: 5 minutes
**Reliability**: Good uptime, modern platform

#### Quick Deploy Steps:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

**Pros**:
- Very simple deployment
- Good developer experience
- Reasonable pricing
- Supports full stack apps

**Cons**:
- Less mature than Vercel/Netlify
- Smaller CDN network

---

### Option 5: Self-Hosted with Docker (Ultimate Control)
**Setup Time**: 30+ minutes
**Reliability**: Depends on your infrastructure

#### Quick Deploy Steps:
1. Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t amante-app .
docker run -p 3000:3000 amante-app
```

**Pros**:
- Complete control
- No vendor lock-in
- Predictable costs
- Can host anywhere (DigitalOcean, Linode, etc.)

**Cons**:
- Requires DevOps knowledge
- You manage infrastructure
- Need to set up CDN separately

---

## Recommended Multi-Provider Setup

### Primary Strategy: Active-Active Deployment
Deploy to **both** Vercel and Netlify simultaneously:

1. **Vercel**: Primary (amante-coming-soon.vercel.app)
2. **Netlify**: Backup (amante-coming-soon.netlify.app)
3. **DNS**: Use Cloudflare with load balancing and failover

#### Cloudflare Load Balancing Setup:
```
Primary Origin: Vercel (weight: 100%)
Failover Origin: Netlify (activates if Vercel is down)
Health checks: Every 60 seconds
```

This ensures:
- Automatic failover if Vercel is down
- Zero downtime
- Your link never breaks

---

## Emergency Deployment Procedure

When Vercel has an outage:

### Step 1: Quick Netlify Deploy (5 minutes)
```bash
# Deploy to Netlify immediately
netlify deploy --prod

# Update DNS if needed
# Point DNS to Netlify until Vercel recovers
```

### Step 2: Communicate (2 minutes)
- Post status update on your status page
- Notify team/stakeholders
- Update social media if customer-facing

### Step 3: Monitor (Ongoing)
- Watch Vercel status page: https://www.vercel-status.com
- Monitor your application health
- Check Netlify performance

### Step 4: Post-Recovery
- Verify Vercel is back
- Re-deploy to Vercel
- Switch DNS back (if changed)
- Post-mortem documentation

---

## Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| Vercel | 100GB bandwidth | $20/mo | Next.js apps |
| Netlify | 100GB bandwidth | $19/mo | Static + Functions |
| Cloudflare Pages | Unlimited | $20/mo | Static sites |
| Railway | $5 credit | $10/mo | Full-stack |
| AWS Amplify | Pay-as-you-go | Variable | Enterprise |

---

## Current Recommendation for Amante

**Immediate Action** (During Outage):
1. Deploy to Netlify as backup
2. Keep the fix ready for Vercel
3. Wait for Vercel to resolve (monitoring status page)

**Long-term Solution**:
1. Set up Netlify as permanent backup
2. Use Cloudflare DNS with health checks
3. Implement automatic failover
4. Cost: ~$0-19/month extra for redundancy

This ensures your menu link **never breaks** regardless of provider outages.

---

## Monitoring & Alerts

Set up monitoring with:
- **UptimeRobot**: Free, checks every 5 minutes
- **Pingdom**: More detailed monitoring
- **StatusCake**: Good free tier

Alert channels:
- Email
- SMS
- Slack/Discord webhook

---

## Next Steps

1. ✅ Code fix is ready (committed locally)
2. ⏳ Wait for Vercel outage to resolve (ETA: Unknown)
3. 🔄 When Vercel recovers, deployment will auto-resume
4. 📝 Set up Netlify backup (30 minutes)
5. 🌐 Configure Cloudflare failover (if needed)
