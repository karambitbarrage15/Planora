"use client";

import { useState, useEffect } from "react";
import FlowingRedBackground from "./FlowingRedBackground";

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL.replace(/\/$/, '')}/api`;

const CATEGORIES = [
  {
    number: "01",
    title: "EVENT PLANNERS",
    category: "Event Planner",
    tagline: "LUXURY COORDINATION & DESIGN",
    description: "Curating unforgettable experiences from grand galas to luxury weddings. Manage budgets, bespoke decor themes, catering, and full-timeline choreography.",
    features: ["Custom Budgets", "Theme & Floral Decor", "Catering Direction", "Timeline Master"]
  },
  {
    number: "02",
    title: "PERFORMERS & ARTISTS",
    category: "Performer",
    tagline: "WORLD-CLASS ENTERTAINMENT",
    description: "Connect with headline DJs, live bands, solo virtuosos, dancers, and stage artists. Tailor stage dimensions, tech riders, sound equipment, and hospitality.",
    features: ["Live Bands & DJs", "Tech & Stage Riders", "Acoustic Specs", "Travel & Stay"]
  },
  {
    number: "03",
    title: "TECHNICAL & EVENT CREW",
    category: "Crew",
    tagline: "PRECISION ON-GROUND PRODUCTION",
    description: "Deploy experienced sound engineers, master lighting technicians, stage managers, and security professionals with tailored shift scheduling.",
    features: ["Sound & Light Techs", "Stage Management", "Safety Compliance", "Shift Allocation"]
  }
];

export default function LandingPage({ onStartPosting }) {
  const [requirements, setRequirements] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/requirements`);
      const json = await res.json();
      if (json.success) {
        setRequirements(json.data || []);
      }
    } catch (err) {
      console.error("Error fetching requirements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const filteredRequirements = filter === "All"
    ? requirements
    : requirements.filter((item) => item.category === filter);

  const parseDate = (dateStr) => {
    if (!dateStr) return { day: "--", month: "---" };
    const d = new Date(dateStr);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      year: d.getFullYear()
    };
  };

  return (
    <div className="luxuryPage">
      {/* Animated Flowing Red Background Beams */}
      <FlowingRedBackground />

      {/* ─── Top Header ─── */}
      <header className="luxHeader">
        <div className="luxHeaderInner">
          {/* Brand Logo */}
          <div className="luxLogoBox" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="luxLogoMain">PLANORA</span>
            <div className="luxLogoSub">
              <span className="luxLogoLine"></span>
              <span className="luxLogoText">EVENT SOURCING</span>
              <span className="luxLogoLine"></span>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="luxNav">
            <a href="#hero" className="luxNavLink active">HOME</a>
            <a href="#about" className="luxNavLink">ABOUT</a>
            <a href="#categories" className="luxNavLink">CATEGORIES</a>
            <a href="#feed" className="luxNavLink">REQUIREMENTS</a>
          </nav>

          {/* Action Button */}
          <div className="luxHeaderActions">
            <button className="luxBtnPostNav" onClick={() => onStartPosting()}>
              POST REQUIREMENT
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section id="hero" className="luxHero">
        <div className="luxHeroOverlay"></div>
        <div className="luxHeroContent">
          <h1 className="luxHeroTitle">
            PLANORA — THE MOST EXQUISITE EVENT PLATFORM
          </h1>
          <p className="luxHeroSubtitle">
            Connecting organizers with verified Event Planners, Performers, and Technical Crew for luxury receptions & galas
          </p>
          <div className="luxHeroButtons">
            <button className="luxBtnRed" onClick={() => onStartPosting()}>
              POST A REQUIREMENT
            </button>
            <a href="#feed" className="luxBtnRedOutline">
              EXPLORE LIVE EVENTS ({requirements.length})
            </a>
          </div>
        </div>
        <div className="luxHeroBottomBadge">
          <span>CURATED EVENT TALENT</span>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="luxSection aboutSection">
        <div className="luxContainer">
          <div className="aboutGrid">
            <div className="aboutTextCol">
              <span className="luxOverline">ABOUT PLANORA</span>
              <h2 className="luxHeading">A NEW STANDARD IN EVENT EXCELLENCE</h2>
              <div className="redDivider"></div>
              <p className="luxParagraph">
                Planora was built to simplify the way event creators source and manage talent. Whether you're coordinating an intimate reception, corporate gala, or live concert, our adaptive 4-step workflow collects precision requirements directly into MongoDB.
              </p>
              <div className="statsRow">
                <div className="statBox">
                  <span className="statNum">3</span>
                  <span className="statLabel">SPECIALIZED TRACKS</span>
                </div>
                <div className="statBox">
                  <span className="statNum">4-STEP</span>
                  <span className="statLabel">ADAPTIVE POSTING FLOW</span>
                </div>
                <div className="statBox">
                  <span className="statNum">REAL-TIME</span>
                  <span className="statLabel">DATABASE RECORDING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories Section with Mouse-Following Neon Spotlight ─── */}
      <section id="categories" className="luxSection servicesSection">
        <div className="luxContainer">
          <div className="sectionTitleCenter">
            <span className="luxOverline">OUR TRACKS</span>
            <h2 className="luxHeading">CHOOSE YOUR TALENT CATEGORY</h2>
            <div className="redDivider center"></div>
            <p className="luxSectionDesc">
              Click any category below to immediately start a requirement customized for that discipline.
            </p>
          </div>

          <div className="categoryGrid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.category}
                className="luxCategoryCard"
                onMouseMove={handleMouseMove}
                onClick={() => onStartPosting(cat.category)}
              >
                <div className="catCardHeader">
                  <span className="catNumber">{cat.number}</span>
                  <span className="catArrow">→</span>
                </div>
                <h3 className="catTitle">{cat.title}</h3>
                <span className="catTagline">{cat.tagline}</span>
                <p className="catDesc">{cat.description}</p>
                <div className="catFeaturesList">
                  {cat.features.map((f) => (
                    <span key={f} className="catFeatureItem">
                      <span className="bullet">▪</span> {f}
                    </span>
                  ))}
                </div>
                <div className="catAction">
                  <span className="catActionText">SELECT TRACK & POST</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Live MongoDB Requirements Section (Re-imagined: VIP Pass / Event Ticket Cards) ─── */}
      <section id="feed" className="luxSection feedSection">
        <div className="luxContainer">
          <div className="feedSectionHeader">
            <div>
              <span className="luxOverline">LIVE DATABASE FEED</span>
              <h2 className="luxHeading">RECENTLY POSTED REQUIREMENTS</h2>
              <div className="redDivider"></div>
            </div>
            <button className="luxBtnRefresh" onClick={fetchRequirements}>
              ↻ REFRESH DATABASE
            </button>
          </div>

          {/* Minimalist Underline Tabs (No clunky red block button) */}
          <div className="minimalFilterTabs">
            {[
              { id: "All", label: "All Requirements", count: requirements.length },
              { id: "Event Planner", label: "Event Planners" },
              { id: "Performer", label: "Performers" },
              { id: "Crew", label: "Crew" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`minFilterTab ${filter === tab.id ? "active" : ""}`}
                onClick={() => setFilter(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && <span className="tabCount">{tab.count}</span>}
              </button>
            ))}
          </div>

          {/* Feed Content */}
          {loading ? (
            <div className="luxLoadingBox">
              <span className="luxSpinner"></span>
              <p>FETCHING DATA FROM MONGODB...</p>
            </div>
          ) : filteredRequirements.length === 0 ? (
            <div className="luxEmptyBox">
              <h3>NO REQUIREMENTS POSTED YET</h3>
              <p>Post your first requirement to see it appear live in this database feed.</p>
              <button className="luxBtnRed" onClick={() => onStartPosting(filter !== "All" ? filter : "")}>
                POST A REQUIREMENT
              </button>
            </div>
          ) : (
            <div className="ticketGrid">
              {filteredRequirements.map((item) => {
                const dateInfo = parseDate(item.startDate);
                return (
                  <div key={item._id} className="ticketCard">
                    {/* Top Row: Clean Typography Date & Category */}
                    <div className="ticketTopRow">
                      <div className="cardDateText">
                        <span className="dateDayNum">{dateInfo.day}</span>
                        <span className="dateMonthText">{dateInfo.month}</span>
                      </div>

                      <div className="ticketMetaRight">
                        <span className="ticketCategory">
                          <span className="ticketDot"></span>
                          {item.category}
                        </span>
                        <span className="ticketType">{item.eventType}</span>
                      </div>
                    </div>

                    {/* Event Title */}
                    <h3 className="ticketTitle">{item.eventName}</h3>

                    {/* Venue & Location */}
                    <div className="ticketLocation">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="locPin">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{item.location} {item.venue ? `— ${item.venue}` : ""}</span>
                    </div>

                    {/* Natural Inline Specifications (Pure Typography, Zero Boxes) */}
                    <div className="cardSpecsText">
                      {item.category === "Event Planner" && item.plannerDetails && (
                        <>
                          {item.plannerDetails.budgetRange && (
                            <span className="specInline accent">{item.plannerDetails.budgetRange}</span>
                          )}
                          {item.plannerDetails.expectedGuests && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.plannerDetails.expectedGuests} Guests
                            </span>
                          )}
                          {item.plannerDetails.theme && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.plannerDetails.theme}
                            </span>
                          )}
                        </>
                      )}

                      {item.category === "Performer" && item.performerDetails && (
                        <>
                          {item.performerDetails.performanceType && (
                            <span className="specInline accent">{item.performerDetails.performanceType}</span>
                          )}
                          {item.performerDetails.genre && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.performerDetails.genre}
                            </span>
                          )}
                          {item.performerDetails.numberOfPerformers && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.performerDetails.numberOfPerformers} Artists
                            </span>
                          )}
                        </>
                      )}

                      {item.category === "Crew" && item.crewDetails && (
                        <>
                          {item.crewDetails.experienceLevel && (
                            <span className="specInline accent">{item.crewDetails.experienceLevel}</span>
                          )}
                          {item.crewDetails.numberOfCrew && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.crewDetails.numberOfCrew} Crew Members
                            </span>
                          )}
                          {item.crewDetails.shiftDuration && (
                            <span className="specInline">
                              <span className="specDot">•</span> {item.crewDetails.shiftDuration}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Footer Row (No Green Color) */}
                    <div className="ticketFooter">
                      <span className="ticketId">ID #{item._id?.slice(-6).toUpperCase()}</span>
                      <span className="ticketStatus">CONFIRMED IN MONGODB</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── Human & Clean Footer ─── */}
      <footer id="contact" className="luxFooter">
        <div className="luxContainer">
          <div className="humanFooterGrid">
            {/* Left: Brand */}
            <div className="humanFooterCol">
              <div className="luxLogoBox" style={{ alignItems: "flex-start" }}>
                <span className="luxLogoMain">PLANORA</span>
                <div className="luxLogoSub" style={{ width: "160px" }}>
                  <span className="luxLogoLine"></span>
                  <span className="luxLogoText">EVENT SOURCING</span>
                  <span className="luxLogoLine"></span>
                </div>
              </div>
              <p className="humanFooterBio">
                A streamlined event requirement posting flow connecting event organizers with planners, performers, and crew.
              </p>
            </div>

            {/* Middle: Quick Links */}
            <div className="humanFooterCol">
              <h4 className="footerColTitle">EXPLORE</h4>
              <ul className="footerLinks">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#categories">Talent Tracks</a></li>
                <li><a href="#feed">Live Requirements</a></li>
              </ul>
            </div>

            {/* Right: Direct Personal Contact */}
            <div className="humanFooterCol">
              <h4 className="footerColTitle">GET IN TOUCH</h4>
              <div className="humanContactList">
                <a href="tel:+918467846891" className="humanContactItem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contactSvg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+91 8467846891</span>
                </a>

                <a href="mailto:chaturvediaditya6768@gmail.com" className="humanContactItem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contactSvg">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>chaturvediaditya6768@gmail.com</span>
                </a>

                <div className="humanContactItem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contactSvg">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Whitefield, Bangalore</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footerBottom">
            <p>PLANORA © 2026. CRAFTED BY ADITYA CHATURVEDI.</p>
            <span className="footerTechBadge">NEXT.JS • EXPRESS • MONGODB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
