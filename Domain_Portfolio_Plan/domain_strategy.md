# Domain Strategy: justinsaju.tech

**Status:** ✅ Available
**Registrar:** GitHub Student Pack
- **Option A:** Namecheap (Free `.me` for 1 year) - *Confirmed Available* ✅
- **Option B:** .TECH Registry (Free `.tech` for 1 year)
**Cost:** Free for 1st Year (Renewals vary)

---

## 🗺️ Subdomain Master Plan

You can host unlimited projects under your main domain. Here is the proposed structure:

### 🏠 Main Site
| Domain | Project | Type |
| :--- | :--- | :--- |
| **`justinsaju.tech`** | **Personal Portfolio** | Main Identity (Resume, Links, About) |
| `www.justinsaju.tech` | (Redirect to root) | - |

### 🚀 Key Projects (Deployable Now)
These are high-quality web projects ready for Vercel/GitHub Pages.

| Subdomain | Repository | content |
| :--- | :--- | :--- |
| **`valentine.justinsaju.tech`** | `valentines-day-fun-project` | Your viral Valentine SaaS App |
| **`lab.justinsaju.tech`** | `AI-Virtual-Sensor-Lab...` | Interactive IoT Sensor Lab |
| **`fitness.justinsaju.tech`** | `AI-Fitness-Trainer` | AI Workout Assistant |
| **`voxel.justinsaju.tech`** | `VoxelFlow` | Hand-tracking Voxel Editor |
| **`rf.justinsaju.tech`** | `RF_-_Wireless_Modulation...` | RF Visualizer Tool |
| **`cake.justinsaju.tech`** | `cake_app` | Cake Ordering App |
| **`cgpa.justinsaju.tech`** | `srm-cgpa-calculator` | Useful tool for SRM students |

### 🛠️ Hardware/Embedded Projects (Showcase Pages)
Since these are hardware code (batteries/sensors), you can't "deploy" the code itself. Instead, create a **Landing Page** (HTML/Video/Images) for each.

| Subdomain | Repository | Content |
| :--- | :--- | :--- |
| **`companion.justinsaju.tech`** | `Emotional-companion` | Demo video & case study of your LLM AI |
| **`blindstick.justinsaju.tech`** | `Smart-Blind-Stick` | Project documentation & video |
| **`vending.justinsaju.tech`** | `Smart-Vending-Machine` | Photos & code explanation |
| **`photobooth.justinsaju.tech`** | `photobooth` | Hardware showcase |

---

## 💰 Renewal Strategy (The "Student Hack")

The `.tech` domain is expensive to renew (~₹4,500).
**Recommendation:**
1.  Use `justinsaju.tech` for **1 Year** (Build brand, get job, show off).
2.  Before it expires, buy a cheap **`.in`** or **`.com`** (~₹500-900).
3.  Migrate your success to the new domain.
4.  **Use the traffic now to build your name.**

---

## 📝 Deployment Checklist (Once Domain is Active)

- [ ] **Step 1:** Add `justinsaju.tech` to Vercel (Main Portfolio).
- [ ] **Step 2:** Add `valentine.justinsaju.tech` to Vercel (Valentine Project).
- [ ] **Step 3:** Go to Namecheap/Tech DNS Settings.
    - [ ] Add `A` Record: `76.76.21.21` (Points root to Portfolio).
    - [ ] Add `CNAME` Record: `valentine` -> `cname.vercel-dns.com`.
    - [ ] Add `CNAME` for other projects...
