import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Briefcase, Code, Paperclip, ComputerIcon, Pencil, BotIcon, CodeSquare } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [displayedText, setDisplayedText] = useState('');
  const [sectionTitleText, setSectionTitleText] = useState('');
  const fullText = "Hi, I'm Mansi!";
  const typewriterRef = useRef(null);
  

  // Icon component mapper
  const IconComponent = ({ iconName, size, color }) => {
    const icons = {
      Briefcase: Briefcase,
      Code: Code,
      Mail: Mail,
      Github: Github,
      Linkedin: Linkedin,
      ExternalLink: ExternalLink,
      Paperclip: Paperclip,
      Pencil: Pencil,
      Bot: BotIcon,
      CodeSquare: CodeSquare
    };
    
    const Icon = icons[iconName] || Briefcase;
    return <Icon size={size} color={color} />;
  };

  // Get link icon and label based on type
  const getLinkInfo = (type) => {
    const linkTypes = {
      github: { icon: Github, label: 'GitHub', color: '#6b4e3d' },
      demo: { icon: ExternalLink, label: 'Demo', color: '#c98686' },
      figma: { icon: Pencil, label: 'Figma', color: '#d4a5a5' },
      website: { icon: ExternalLink, label: 'Test it out!', color: '#9b7e6b' }
    };
    return linkTypes[type] || linkTypes.website;
  };
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [activeSection]);

  // Fixed typewriter effect for main title
  useEffect(() => {
    if (activeSection !== 'about') return;
    
    let index = 0;
    let isDeleting = false;
    let timeoutId;
    
    const type = () => {
      if (!isDeleting) {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
          timeoutId = setTimeout(type, 100);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (index > 0) {
          index--;
          setDisplayedText(fullText.slice(0, index));
          timeoutId = setTimeout(type, 50);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = false;
            type();
          }, 500);
        }
      }
    };
    
    type();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeSection]);

  // Typewriter effect for section titles
  useEffect(() => {
    let sectionTitle = '';
    if (activeSection === 'experience') {
      sectionTitle = 'Experience';
    } else if (activeSection === 'projects') {
      sectionTitle = 'Recent Work';
    } else {
      return;
    }
    
    let index = 0;
    let isDeleting = false;
    let timeoutId;
    
    const type = () => {
      if (!isDeleting) {
        if (index <= sectionTitle.length) {
          setSectionTitleText(sectionTitle.slice(0, index));
          index++;
          timeoutId = setTimeout(type, 100);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      }
    };
    
    type();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeSection]);

  const skills = [
    { 
      category: "Languages", 
      items: ["Java", "Python", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Kotlin"],
      color: "#d4a5a5"
    },
    { 
      category: "Frameworks + Libraries", 
      items: ["React", "Angular", "Node.js", "Pandas", "Numpy", "Matplotlib"],
      color: "#c98686"
    },
    { 
      category: "Tools + Software", 
      items: ["Git", "GitHub", "GitLab", "VS Code", "Figma", "Jupyter Notebook", "Power BI", "Android Studio"],
      color: "#9b7e6b"
    }
  ];

  const projects = [
    {
      title: "Fitify",
      description: "A fashion app that helps you effortlessly mix-and-match clothing pieces to create the perfect outfit. Developed during my Spring 2025 Human-Computer Interaction course.",
      tech: ["React", "Figma", "UI/UX Design"],
      links: {
        github: "https://github.com/mansimadhani/alt_fitify",
        demo: "https://drive.google.com/file/d/1BcG6Qj_E4NTCpwSgleNagweqE2rCJ5Ox/view?usp=sharing",
        website: "https://mansimadhani.github.io/alt_fitify/"
      },
      bgColor: "#f5e6e8",
      borderColor: "#c98686"
    },

    {
      title: "BounceBack",
      description: "A gamified, collaborative bucket list experience designed to support social reintegration. Designed as part of my work with Texas Convergent's Social Impact build team.",
      tech: ["Figma", "UI/UX Design"],
      links: {
        github: "https://github.com/caitlin8105/convergent-si",
        demo: "https://drive.google.com/file/d/1D_yZM-BIHIDAmF8u6qr6BMsx9OmLYi-T/view?usp=sharing",
        figma: "https://www.figma.com/proto/E3gUDp2kA4U3KqIgt0WIpZ/Convergent-Basic-Wireframe?node-id=357-15&p=f&t=JDgo45Jui9POzSqQ-1&scaling=scale-down&content-scaling=fixed&page-id=357%3A2&starting-point-node-id=357%3A3"
      },
      bgColor: "#fff0f5",
      borderColor: "#d4a5a5"
    },
    
    {
      title: "Chowboy",
      description: "Fighting food insecurity at UT Austin, one chow at a time. Discover food distribution events near campus, access promo codes for food delivery services, and more. Created during the 2025 WiCS Hackathon.",
      tech: ["JavaScript", "React", "Figma", "UI/UX Design"],
      links: {
        github: "https://github.com/sanikanandpure/chowboy-wicshacks2025",
        demo: "https://drive.google.com/file/d/1yuJ582ZB9B_Y_sv_jpDGPbzIIZod0aQW/view?usp=sharing",
        figma: "https://www.figma.com/design/4na4kKrMPbcIOaFrzuZmqH/Chowboy?node-id=18-32&t=GXsP6hyaGLFu4W8s-1"
      },
      bgColor: "#f9f3f0",
      borderColor: "#9b7e6b"
    },

    {
      title: "Robot Presenter",
      description: "An autonomous, Python-based presentation system that integrates the OpenAI API and SpeechT5 text-to-speech engine to support natural language generation, speech synthesis, and slide navigation. Designed and implemented as part of the Autonomous Robots FRI stream under Dr. Justin Hart.",
      tech: ["Python", "API Integration"],
      links: {
        github: "https://github.com/AthulyaS123/PresentationRobot",
      },
      bgColor: "#f9f3f0",
      borderColor: "#9b7e6b"
    },

    {
      title: "Treatsi",
      description: "A web app that encourages customers to support local cafes, restaurants, and small businesses through a gamified rewards system. It also gives owners useful analytics to improve operations. Awarded Best Novice Hack at the 2024 WiCS Hackathon among 200+ participants and 50+ projects.",
      tech: ["JavaScript", "React", "Flask", "SQLite", "Figma", "UI/UX Design"],
      links: {
        github: "https://github.com/krisub/wics_hacks_24",
      },
      bgColor: "#f5e6e8",
      borderColor: "#c98686"
    }
  ];

  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Google",
      period: "May 2026 - August 2026",
      description: "Built a full-stack changelog system for Google's Cross Apps Analytics (XAA) Data Catalog using Java, Protobuf, and Angular to automate tracking historical metric definition changes across Google Workspace analytics. Authored a design document, collaborated with stakeholders to define changelog data and UI requirements, and implemented a daily Borg batch pipeline to compute and store metric definition diffs.",
      bgColor: "#f5e6e8",
      borderColor: "#c98686",
      icon: "CodeSquare"
    },
    {
      role: "Technology Analyst Intern",
      company: "State Farm",
      period: "January 2026 - May 2026",
      description: "Led discovery and requirements for a new Zoom-based call monitoring system across State Farm insurance agents' offices. Conducted in-office and virtual feedback sessions with agents, translating insights into product and design decisions with cross-functional teams (UX, AI, legal, engineering).",
      bgColor: "#f9f3f0",
      borderColor: "#9b7e6b",
      icon: "Pencil"
    },
    {
      role: "Software Engineering Intern",
      company: "Upbound Group",
      period: "June 2025 - August 2025",
      description: "Developed and deployed microservice-based features using React (TypeScript), PostgreSQL, and GitLab CI/CD. Implemented a void flow for pre-delivery agreement cancellations in Rent-A-Center's POS system (RACPad), unlocking up to $1.5M/month in value through more accurate inventory tracking. Built a payment-reversal flow allowing coworkers to void agreements and reverse multiple payments in one step, reducing manual errors and improving efficiency. Designed Power BI dashboards for the Digital Technology team, integrating Jira API data to visualize key metrics on high-impact projects.",
      bgColor: "#fff0f5",
      borderColor: "#d4a5a5",
      icon: "CodeSquare"
    },
    {
      role: "UI/UX Designer",
      company: "Texas Convergent",
      period: "January 2025 - May 2025",
      description: "Designed BounceBack, a gamified bucket list mobile app that connects users in randomized groups to ease social reintegration. Conducted user interviews to improve design choices and enhance usability. Used Figma to develop the app's branding identity and user flow.",
      bgColor: "#f5e6e8",
      borderColor: "#c98686",
      icon: "Pencil"
    },
    {
      role: "Research Intern",
      company: "University of Texas at Austin",
      period: "May 2024 - August 2024",
      description: "Worked at the Living With Robots Laboratory under the guidance of Dr. Justin Hart, as part of UT Austin's Accelerated Research Initiative summer internship program. Developed a conversational service bot as part of a project team, focusing on Python components and integrating the OpenAI API to handle user interactions, real-time script generation, and task execution.",
      bgColor: "#f9f3f0",
      borderColor: "#9b7e6b",
      icon: "Bot"
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#faf8f3',
      fontFamily: 'Inter, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    },

    decorativeBlob1: {
      position: 'fixed',
      top: '-100px',
      right: '-100px',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(212,165,165,0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      zIndex: 0,
      pointerEvents: 'none'
    },
    decorativeBlob2: {
      position: 'fixed',
      bottom: '-150px',
      left: '-150px',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(155,126,107,0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(80px)',
      zIndex: 0,
      pointerEvents: 'none'
    },
    header: {
      background: 'rgba(250, 248, 243, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid #6b4e3d',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    nav: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      margin: 0,
      fontFamily: '"Google Sans Mono", Georgia, serif',
      position: 'relative',
      display: 'inline-block'
    },
    logoUnderline: {
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: '100%',
      height: '3px',
      background: '#c98686',
      borderRadius: '2px'
    },
    navLinks: {
      display: 'flex',
      gap: '32px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      fontSize: '17px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      position: 'relative',
      padding: '8px 0',
    },
    navButtonUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '2px',
      background: '#c98686',
      transition: 'width 0.3s'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px',
      position: 'relative',
      zIndex: 1
    },
    avatarContainer: {
      width: '140px',
      height: '140px',
      background: 'linear-gradient(135deg, #c98686, #d4a5a5)',
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px',
      animation: 'morph 8s ease-in-out infinite',
      boxShadow: '0 10px 40px rgba(201, 134, 134, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    avatarCircle: {
      position: 'absolute',
      borderRadius: '50%',
      border: '3px solid rgba(255, 255, 255, 0.3)',
    },
    avatarDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'white',
      position: 'absolute',
    },
    mainTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      marginBottom: '16px',
      fontFamily: '"Google Sans Mono", Georgia, serif',
      lineHeight: '1.2',
      minHeight: '68px'
    },
    subtitle: {
      fontSize: '24px',
      color: '#c98686',
      marginBottom: '32px',
      fontStyle: 'italic'
    },
    paragraph: {
      fontSize: '18px',
      color: '#6b4e3d',
      lineHeight: '1.8',
      marginBottom: '16px'
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px',
      flexWrap: 'wrap'
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s',
      border: '2px solid',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    skillsContainer: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      padding: '40px',
      border: '3px solid #6b4e3d',
      marginTop: '32px',
      paddingTop: '0px',
      position: 'relative',
    },
    sectionTitle: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      marginBottom: '0px',
      fontFamily: '"Google Sans Mono", Georgia, serif',
      position: 'relative',
      display: 'inline-block',
    },

    skillsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',

    },
    skillCategoryContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    skillCategoryTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      letterSpacing: '1.5px',
      marginBottom: '15px',
    },
    skillTagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    skillTag: {
      padding: '10px 20px',
      borderRadius: '25px',
      fontSize: '15px',
      fontWeight: '600',
      color: 'white',
      border: '2px solid',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      animation: 'skillFloat 3s ease-in-out infinite',
    },
    timelineContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      position: 'relative',
      paddingLeft: '60px'
    },
    timelineLine: {
      position: 'absolute',
      left: '20px',
      top: '60px',
      bottom: '0',
      width: '3px',
      background: 'linear-gradient(180deg, #d4a5a5, #c98686, #9b7e6b)',
      borderRadius: '2px'
    },
    timelineItem: {
      position: 'relative',
      marginBottom: '48px',
      paddingLeft: '40px',
    },
    timelineDot: {
      position: 'absolute',
      left: '-48px',
      top: '24px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '4px solid',
      background: '#faf8f3',
      zIndex: 2,
      transition: 'all 0.3s'
    },
    experienceCard: {

      borderRadius: '25px',
      padding: '32px',
      border: '3px solid',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 100%)'

    },

    experienceGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
      opacity: 0,
      transition: 'opacity 0.5s, transform 0.5s',
      pointerEvents: 'none',
      zIndex: 0
    },
    experienceHeader: {
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
      position: 'relative',
      zIndex: 1,
    },
    iconBox: {
      padding: '16px',
      background: 'white',
      borderRadius: '15px',
      flexShrink: 0,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      animation: 'iconFloat 3s ease-in-out infinite'
    },
    experienceTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      marginBottom: '8px',
      fontFamily: '"Google Sans Mono", Georgia, serif'
    },
    experienceCompany: {
      color: '#c98686',
      marginBottom: '12px',
      fontWeight: '600',
      display: 'inline-block',
      position: 'relative',
      zIndex: 1
    },

    experiencePeriod: {

      display: 'inline-block',
      padding: '4px 12px',
      background: 'rgba(155, 126, 107, 0.15)',
      borderRadius: '12px',
      fontSize: '14px',
      marginLeft: '8px',
      fontWeight: '600',
      color: '#6b4e3d'
    },
    experienceDesc: {
      color: '#6b4e3d',
      lineHeight: '1.6'
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    projectCard: {
      borderRadius: '25px',
      padding: '32px',
      border: '3px solid',
      transition: 'all 0.4s',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      position: 'relative',
      zIndex: 1
    },
    projectTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#6b4e3d',
      marginBottom: '16px',
      fontFamily: '"Google Sans Mono", Georgia, serif'
    },
    projectDesc: {
      color: '#6b4e3d',
      marginBottom: '20px',
      lineHeight: '1.6',
      flex: 1
    },
    techTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px'
    },
    techTag: {
      padding: '6px 16px',
      background: 'white',
      color: '#6b4e3d',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      border: '2px solid #6b4e3d'
    },
    projectLinks: {

      display: 'flex',

      gap: '12px',

      flexWrap: 'wrap'

    },

    projectLinkButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      borderRadius: '20px',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.3s',
      border: '2px solid',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      <div style={styles.decorativeBlob1}></div>
      <div style={styles.decorativeBlob2}></div>
      
      <header style={styles.header}>
        <nav style={styles.nav}>
          <h1 style={styles.logo}>
            Mansi Madhani
            <div style={styles.logoUnderline}></div>
          </h1>
          <div style={styles.navLinks}>
            <button
              onClick={() => setActiveSection('about')}
              style={{
                ...styles.navButton,
                color: activeSection === 'about' ? '#c98686' : '#6b4e3d'
              }}
            >
              About
              {activeSection === 'about' && (
                <div style={{...styles.navButtonUnderline, width: '100%'}}></div>
              )}
            </button>
            <button
              onClick={() => setActiveSection('experience')}
              style={{
                ...styles.navButton,
                color: activeSection === 'experience' ? '#c98686' : '#6b4e3d'
              }}
            >
              Experience
              {activeSection === 'experience' && (
                <div style={{...styles.navButtonUnderline, width: '100%'}}></div>
              )}
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              style={{
                ...styles.navButton,
                color: activeSection === 'projects' ? '#c98686' : '#6b4e3d'
              }}
            >
              Projects
              {activeSection === 'projects' && (
                <div style={{...styles.navButtonUnderline, width: '100%'}}></div>
              )}
            </button>
          </div>
        </nav>
      </header>

      <main style={styles.main}>
        {activeSection === 'about' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '64px' }}>
              <div style={styles.avatarContainer} className="animate-float scroll-animate">
                <img
                  src="/laptop.gif"
                  alt="avatar"
                  style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <h2 style={styles.mainTitle}>
                {displayedText}
                <span style={{
                  borderRight: '3px solid #c98686',
                  animation: 'blink 0.7s infinite',
                  marginLeft: '2px'
                }}>
                </span>
              </h2>
              <p style={styles.subtitle} className="scroll-animate">Exploring the intersection of tech, business, and design.</p>
              
              <p style={styles.paragraph} className="scroll-animate">
                I'm a junior at UT Austin, pursuing a B.S. in Computer Science with a minor in Business Administration. 
                My passions lie in software engineering, UI/UX design, and any space where creativity meets technical problem-solving. 
                I aim to leverage the power of technology to build real-world solutions that make a meaningful impact on communities.
              </p>
              
              <div style={styles.socialLinks} className="scroll-animate">
                <a 
                  href="https://www.linkedin.com/in/mansimadhani/" 
                  style={{
                    ...styles.socialButton, 
                    background: 'white', 
                    borderColor: '#d4a5a5',
                    color: '#d4a5a5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d4a5a5';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#d4a5a5';
                  }}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/mansimadhani" 
                  style={{
                    ...styles.socialButton, 
                    background: 'white', 
                    borderColor: '#c98686',
                    color: '#c98686'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c98686';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#c98686';
                  }}
                >
                  <Github size={20} />
                  GitHub
                </a>
                <a 
                  href="mailto:mansimadhani@utexas.edu" 
                  style={{
                    ...styles.socialButton, 
                    background: 'white', 
                    borderColor: '#9b7e6b',
                    color: '#9b7e6b'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9b7e6b';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#9b7e6b';
                  }}
                >
                  <Mail size={20} />
                  Email
                </a>
                <a 
                  href="https://docs.google.com/document/d/1-Urfh1ibzuhDloHR-LyEMKLClAdbYsbNcwp5UZvvDSk/edit?tab=t.0" 
                  style={{
                    ...styles.socialButton, 
                    background: 'white', 
                    borderColor: '#6b4e3d',
                    color: '#6b4e3d'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#6b4e3d';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#6b4e3d';
                  }}
                >
                  <Paperclip size={20} />
                  Resume
                </a>
              </div>
            </div>

            <div style={styles.skillsContainer} className="scroll-animate">
              <h3 style={styles.sectionTitle}>
                Technical Skills
                <div></div>
              </h3>
              <div style={styles.skillsGrid}>
                {skills.map((skillGroup, index) => (
                  <div 
                    key={index} 
                    className="scroll-animate"
                    style={styles.skillCategoryContainer}
                  >
                    <h4 style={styles.skillCategoryTitle}>{skillGroup.category}</h4>
                    <div style={styles.skillTagsContainer}>
                      {skillGroup.items.map((skill, i) => (
                        <div
                          key={i}
                          className="skill-pill"
                          style={{
                            ...styles.skillTag,
                            background: skillGroup.color,
                            borderColor: skillGroup.color,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: `${3 + (i % 3) * 0.5}s`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.1) rotate(2deg)';
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.color = skillGroup.color;
                            e.currentTarget.style.animation = 'none';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                            e.currentTarget.style.background = skillGroup.color;
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.animation = `skillFloat ${3 + (i % 3) * 0.5}s ease-in-out infinite`;
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div>
            <h2 style={{...styles.sectionTitle, fontSize: '48px', marginBottom: '48px', textAlign: 'center'}} className="scroll-animate">
              {sectionTitleText}
              <span style={{
                borderRight: '3px solid #c98686',
                animation: 'blink 0.7s infinite',
                marginLeft: '2px'
              }}>
              </span>
              <div style={{margin: '0 auto'}}></div>
            </h2>
            <div style={styles.timelineContainer}>
              <div style={styles.timelineLine}></div>
              {experiences.map((exp, index) => (
                <div key={index} style={styles.timelineItem} className="scroll-animate">
                  <div 
                    style={{...styles.timelineDot, borderColor: exp.borderColor}}
                    className="timeline-dot"
                  ></div>
                  <div
                    style={{
                      ...styles.experienceCard,
                      background: exp.bgColor,
                      borderColor: exp.borderColor
                    }}
                    onMouseEnter={(e) => {

                      e.currentTarget.style.transform = 'translateX(15px) scale(1.02)';

                      const dot = e.currentTarget.parentElement.querySelector('.timeline-dot');
                      const glow = e.currentTarget.querySelector('.experience-glow');
                      const icon = e.currentTarget.querySelector('.icon-box');

                      if (dot) {
                        dot.style.transform = 'scale(1.6)';
                        dot.style.background = exp.borderColor;
                      }

                      if (glow) {
                        glow.style.opacity = '1';
                        glow.style.transform = 'translate(25%, 25%)';
                      }

                      if (icon) {
                        icon.style.transform = 'rotate(10deg) scale(1.1)';
                        icon.style.boxShadow = `0 8px 20px ${exp.borderColor}40`;
                        icon.style.animation = 'none';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';

                      const dot = e.currentTarget.parentElement.querySelector('.timeline-dot');
                      const glow = e.currentTarget.querySelector('.experience-glow');
                      const icon = e.currentTarget.querySelector('.icon-box');

                      if (dot) {
                        dot.style.transform = 'scale(1)';
                        dot.style.background = '#faf8f3';
                        dot.style.boxShadow = 'none';
                      }

                      if (glow) {
                        glow.style.opacity = '0';
                        glow.style.transform = 'translate(0, 0)';
                      }

                      if (icon) {
                        icon.style.transform = 'rotate(0deg) scale(1)';
                        icon.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        icon.style.animation = `iconFloat ${3 + (index % 3) * 0.5}s ease-in-out infinite`;
                      }
                    }}
                  >
                    <div className="experience-glow" style={styles.experienceGlow}></div>
                    <div style={styles.experienceHeader}>
                      <div className="icon-box" style={{
                        ...styles.iconBox,
                        animationDelay: `${index * 0.2}s`,
                        animationDuration: `${3 + (index % 3) * 0.5}s`
                      }}>
                        <IconComponent iconName={exp.icon} size={28} color={exp.borderColor} />
                      </div>
                      <div style={{flex: 1}}>
                        <h3 style={styles.experienceTitle}>{exp.role}</h3>
                        <p style={{marginBottom: '12px'}}>
                          <span style={{color: '#c98686', fontWeight: '600', position: 'relative', zIndex: 1}}>
                            {exp.company}
                          </span>
                          <span style={styles.experiencePeriod}>{exp.period}</span>
                        </p>
                        <p style={styles.experienceDesc}>{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div>
            <h2 style={{...styles.sectionTitle, fontSize: '48px', marginBottom: '48px', textAlign: 'center'}} className="scroll-animate">
              {sectionTitleText}
              <span style={{
                borderRight: '3px solid #c98686',
                animation: 'blink 0.7s infinite',
                marginLeft: '2px'
              }}>
              </span>
              <div style={{margin: '0 auto'}}></div>
            </h2>
            <div style={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="scroll-animate"
                  style={{
                    ...styles.projectCard,
                    background: project.bgColor,
                    borderColor: project.borderColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotate(-1deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectDesc}>{project.description}</p>
                  <div style={styles.techTags}>
                    {project.tech.map((tech, i) => (
                      <span key={i} style={{...styles.techTag,
                        backgroundColor: project.borderColor,
                        border: '0px',
                        color: 'white'
                       }}>{tech}</span>
                    ))}
                  </div>
                  <div style={styles.projectLinks}>

                    {project.links && Object.entries(project.links).map(([type, url]) => {

                      const linkInfo = getLinkInfo(type);

                      const LinkIcon = linkInfo.icon;

                      return (

                        <a

                          key={type}

                          href={url}

                          target="_blank"

                          rel="noopener noreferrer"

                          style={{

                            ...styles.projectLinkButton,

                            background: 'white',

                            borderColor: linkInfo.color,

                            color: linkInfo.color

                          }}

                          onMouseEnter={(e) => {

                            e.currentTarget.style.background = linkInfo.color;

                            e.currentTarget.style.color = 'white';

                          }}

                          onMouseLeave={(e) => {

                            e.currentTarget.style.background = 'white';

                            e.currentTarget.style.color = linkInfo.color;

                          }}

                        >

                          <LinkIcon size={16} />

                          {linkInfo.label}

                        </a>

                      );

                    })}

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes morph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes skillFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}