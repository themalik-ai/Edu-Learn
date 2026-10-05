import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenCheck,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Code2,
  Compass,
  Copy,
  CreditCard,
  Download,
  FileText,
  Globe2,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  Lightbulb,
  LockKeyhole,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  MessageCircle,
  MonitorCog,
  Moon,
  Palette,
  PanelTop,
  Phone,
  Play,
  Plus,
  Quote,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Target,
  Users,
  UserRound,
  Video,
  WandSparkles,
  X,
  Zap,
  ChartNoAxesCombined,
  BadgeCheck,
  CirclePlay,
  Layers3,
  BookMarked,
  Timer,
  Headphones,
  PenTool,
  ExternalLink,
  TriangleAlert,
  Eye,
  EyeOff,
  SlidersHorizontal,
  CircleDollarSign,
  MousePointer2,
  Presentation,
  CheckSquare2,
  CircleUserRound,
  Trophy,
  TrendingUp,
  ListChecks,
  MoreHorizontal,
  LaptopMinimal,
  FileBadge,
} from "lucide-react";
import {
  categories,
  courses,
  faqs,
  images,
  instructors,
  posts,
  testimonials,
} from "./data";
import "./styles.css";
import "swiper/css";
import "swiper/css/pagination";

const iconMap = {
  Code2,
  Palette,
  BriefcaseBusiness,
  Megaphone,
  MonitorCog,
  Rocket,
  ChartNoAxesCombined,
  Sparkles,
};

const pageTitles = {
  "/": "EduLearn — Learn today. Lead tomorrow.",
  "/courses": "Courses | EduLearn",
  "/about": "About us | EduLearn",
  "/blog": "Learning journal | EduLearn",
  "/contact": "Contact us | EduLearn",
  "/login": "Welcome back | EduLearn",
  "/register": "Create your account | EduLearn",
  "/dashboard": "Student dashboard | EduLearn",
  "/faq": "Frequently asked questions | EduLearn",
  "/privacy": "Privacy policy | EduLearn",
  "/terms": "Terms & conditions | EduLearn",
};

function useTitle(title) {
  useEffect(() => {
    document.title = title || "EduLearn";
  }, [title]);
}

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const notify = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(window.__edulearnToast);
    window.__edulearnToast = window.setTimeout(() => setToast(null), 3800);
  };
  return (
    <ToastContext.Provider value={notify}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className={`toast ${toast.type}`}
            role="status"
          >
            <span>
              {toast.type === "error" ? (
                <TriangleAlert size={19} />
              ) : (
                <CheckCircle2 size={19} />
              )}
            </span>
            <p>{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
import { createContext, useContext } from "react";
const ToastContext = createContext(() => {});
const useToast = () => useContext(ToastContext);

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("edulearn-user"));
  } catch {
    return null;
  }
}
function getEnrolled() {
  try {
    return JSON.parse(localStorage.getItem("edulearn-enrolled") || "[]");
  } catch {
    return [];
  }
}
function setEnrolled(ids) {
  localStorage.setItem("edulearn-enrolled", JSON.stringify(ids));
}

function Logo({ compact = false, light = false }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to="/"
      aria-label="EduLearn home"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M8.5 14.5c6.8-1.4 11.8.4 15.5 4.1 3.7-3.7 8.7-5.5 15.5-4.1v18.7c-6-1.2-11.2.3-15.5 4.2-4.3-3.9-9.5-5.4-15.5-4.2V14.5Z" />
          <path d="M24 18.6v18.6" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-type">
          Edu<span>Learn</span>
        </span>
      )}
    </Link>
  );
}

function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size = "",
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
}) {
  const cls = `btn btn-${variant} ${size ? `btn-${size}` : ""} ${className}`;
  if (to)
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}

function Reveal({ children, className = "", delay = 0, y = 20, once = true }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, children, align = "left", action }) {
  return (
    <div className={`section-heading ${align === "center" ? "centered" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  );
}

function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w;
    let h;
    const dots = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: i % 4 === 0 ? 3 : 1.5,
      vx: (Math.random() - 0.5) * 0.00014,
      vy: (Math.random() - 0.5) * 0.00012,
      a: 0.15 + Math.random() * 0.38,
    }));
    const size = () => {
      const box = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = box.width * Math.min(window.devicePixelRatio, 2);
      h = canvas.height = box.height * Math.min(window.devicePixelRatio, 2);
      ctx.scale(
        Math.min(window.devicePixelRatio, 2),
        Math.min(window.devicePixelRatio, 2),
      );
      w = box.width;
      h = box.height;
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    size();
    draw();
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas ref={ref} className="particle-field" aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 15);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const user = getUser();
  const links = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-shell">
        <Logo />
        <nav className="main-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/faq">FAQ</NavLink>
        </nav>
        <div className="header-actions">
          {user ? (
            <Button to="/dashboard" variant="quiet" size="small">
              <LayoutDashboard size={17} /> Dashboard
            </Button>
          ) : (
            <>
              <Button to="/login" variant="quiet" size="small">
                Log in
              </Button>
              <Button to="/register" size="small">
                Join for free <ArrowRight size={16} />
              </Button>
            </>
          )}
        </div>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav>
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"}>
                  {link.label}
                  <ChevronRight size={18} />
                </NavLink>
              ))}
              <NavLink to="/faq">
                FAQ <ChevronRight size={18} />
              </NavLink>
            </nav>
            <div className="mobile-menu-actions">
              {user ? (
                <Button to="/dashboard" variant="secondary">
                  Open dashboard
                </Button>
              ) : (
                <>
                  <Button to="/login" variant="secondary">
                    Log in
                  </Button>
                  <Button to="/register">Create free account</Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return toast("Please enter a valid email address.", "error");
    setSent(true);
    toast("You are on the list — welcome to the learning circle.");
  };
  const LinkList = ({ children }) => <ul>{children}</ul>;
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div>
          <span className="eyebrow">A monthly note worth opening</span>
          <h2>Make room for your next big idea.</h2>
          <p>
            Fresh learning resources, career insights and course
            updates—delivered with care.
          </p>
        </div>
        <form onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="footer-email">
            Email address
          </label>
          <input
            id="footer-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
            }}
            placeholder="you@example.com"
            type="email"
          />
          <Button type="submit">
            {sent ? (
              <>
                <Check size={17} /> Subscribed
              </>
            ) : (
              <>
                Subscribe <ArrowRight size={17} />
              </>
            )}
          </Button>
        </form>
      </div>
      <div className="footer-grid">
        <div className="footer-intro">
          <Logo light />
          <p>
            Thoughtful online education for the skills and confidence that move
            you forward.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="EduLearn on Facebook"
            >
              <Globe2 size={18} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="EduLearn on Instagram"
            >
              <Globe2 size={18} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="EduLearn on LinkedIn"
            >
              <BriefcaseBusiness size={18} />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="EduLearn on YouTube"
            >
              <CirclePlay size={19} />
            </a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <LinkList>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/blog">Learning journal</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </LinkList>
        </div>
        <div>
          <h3>Learning</h3>
          <LinkList>
            <li>
              <Link to="/courses">All courses</Link>
            </li>
            <li>
              <Link to="/courses?sort=popular">Popular courses</Link>
            </li>
            <li>
              <Link to="/courses?certificate=true">Certificates</Link>
            </li>
            <li>
              <Link to="/about#instructors">Meet instructors</Link>
            </li>
            <li>
              <Link to="/dashboard">My learning</Link>
            </li>
          </LinkList>
        </div>
        <div>
          <h3>Support</h3>
          <LinkList>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/faq">Help center</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & conditions</Link>
            </li>
            <li>
              <a href="mailto:hello@edulearn.example">hello@edulearn.example</a>
            </li>
          </LinkList>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 EduLearn. All Rights Reserved.</span>
        <span>Made with purpose for curious minds.</span>
      </div>
    </footer>
  );
}

function Layout({ children }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 650);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <ScrollTop />
      <Header />
      <main>{children}</main>
      <Footer />
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="back-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <ArrowUpRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function Stat({ value, label, icon: Icon }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.7 });
  const [number, suffix] = value.match(/(\d+)(.*)/).slice(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start;
    const duration = 1000;
    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.floor(Number(number) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, number]);
  return (
    <div ref={ref} className="stat">
      <span className="stat-icon">
        <Icon size={22} />
      </span>
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function CourseCard({ course, compact = false }) {
  return (
    <article className={`course-card ${compact ? "compact" : ""}`}>
      <Link
        to={`/courses/${course.id}`}
        className="course-image-wrap"
        aria-label={`View ${course.title}`}
      >
        <img src={course.image} alt={`${course.title} course`} loading="lazy" />
        <span className={`course-tag tag-${course.color}`}>{course.tag}</span>
        <span className="course-heart">
          <Heart size={17} />
        </span>
      </Link>
      <div className="course-content">
        <div className="course-meta">
          <span>{course.category}</span>
          <span className="dot">•</span>
          <span>{course.level}</span>
        </div>
        <h3>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h3>
        <p className="course-description">{course.description}</p>
        <div className="instructor-line">
          <span className="mini-avatar">
            {course.instructor
              .split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span>{course.instructor}</span>
        </div>
        <div className="course-rating">
          <span>
            <Star size={15} fill="currentColor" /> {course.rating}
          </span>
          <small>({course.reviews.toLocaleString()})</small>
          <span className="course-students">
            <Users size={15} /> {course.students.toLocaleString()}
          </span>
        </div>
        <div className="course-footer">
          <div>
            <span className="old-price">${course.price}</span>
            <strong>${course.salePrice}</strong>
          </div>
          <span className="duration">
            <Clock3 size={15} />
            {course.duration}
          </span>
        </div>
        <Link to={`/courses/${course.id}`} className="course-link">
          View course <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] || Sparkles;
  return (
    <Link
      to={`/courses?category=${encodeURIComponent(category.name)}`}
      className={`category-card cat-${category.color}`}
    >
      <span className="category-icon">
        <Icon size={25} />
      </span>
      <span className="category-copy">
        <strong>{category.name}</strong>
        <small>{category.count} courses</small>
      </span>
      <ArrowUpRight className="category-arrow" size={19} />
    </Link>
  );
}

function Newsletter({ light = false }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      toast("Add a valid email to subscribe.", "error");
      return;
    }
    setStatus("success");
    toast("Subscription confirmed. Your first note is on its way.");
  };
  return (
    <section className={`newsletter ${light ? "newsletter-light" : ""}`}>
      <div className="newsletter-orb one" />
      <div className="newsletter-orb two" />
      <Reveal className="newsletter-inner">
        <div>
          <span className="eyebrow">The EduLearn edit</span>
          <h2>
            Stay ahead of the
            <br />
            learning curve.
          </h2>
          <p>
            Useful career ideas, fresh resources, and new course drops—never
            noisy, always useful.
          </p>
        </div>
        <form onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-field">
            <input
              id="newsletter-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("");
              }}
              type="email"
              placeholder="Enter your email address"
            />
            <Button type="submit">
              {status === "success" ? (
                <Check size={19} />
              ) : (
                <>
                  Subscribe <Send size={17} />
                </>
              )}
            </Button>
          </div>
          {status === "error" && (
            <span className="field-note error">
              Please use a valid email address.
            </span>
          )}
          {status === "success" && (
            <span className="field-note success">
              <CheckCircle2 size={15} /> Thank you — you are subscribed.
            </span>
          )}
        </form>
      </Reveal>
    </section>
  );
}

function HomePage() {
  useTitle(pageTitles["/"]);
  return (
    <>
      <section className="hero">
        <ParticleField />
        <div className="hero-shape hero-shape-a" />
        <div className="hero-shape hero-shape-b" />
        <div className="hero-shell">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-kicker">
              <span className="live-dot" /> Learning designed for your next
              chapter
            </div>
            <h1>
              Learn skills that
              <br />
              <em>shape your future.</em>
            </h1>
            <p>
              Practical online courses, thoughtful mentors, and a learning space
              made to help you grow with confidence.
            </p>
            <div className="hero-actions">
              <Button to="/courses">
                Explore courses <ArrowRight size={18} />
              </Button>
              <Button to="/register" variant="secondary">
                <Play size={17} fill="currentColor" /> Start learning
              </Button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <img src={images.mentor} alt="" />
                <img src={images.codingWoman} alt="" />
                <img src={images.teacher} alt="" />
                <span>50k+</span>
              </div>
              <p>
                <strong>Loved by lifelong learners</strong>
                <span>
                  <Star size={14} fill="currentColor" /> 4.9 average learner
                  rating
                </span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 28, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="hero-photo-frame">
              <img src={images.hero} alt="Student studying at a laptop" />
              <div className="photo-tint" />
            </div>
            <motion.div
              className="float-card hero-completion"
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="float-icon">
                <Trophy size={19} />
              </span>
              <div>
                <small>Course completed</small>
                <strong>Well done, Amna!</strong>
              </div>
              <CheckCircle2 size={19} />
            </motion.div>
            <motion.div
              className="float-card hero-playcard"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <span className="play-pink">
                <Play size={17} fill="currentColor" />
              </span>
              <div>
                <small>Continue watching</small>
                <strong>Designing with intent</strong>
                <span>14:28 min left</span>
              </div>
            </motion.div>
            <div className="hero-scribble">
              <svg viewBox="0 0 130 70">
                <path d="M10 13c32-16 66-6 82 15 9 12 9 25 23 28M105 44l12 12 3-16" />
              </svg>
              <span>Make it yours</span>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="stats-section">
        <div className="stats-grid">
          <Stat value="50K+" label="active students" icon={Users} />
          <Stat
            value="100+"
            label="career-focused courses"
            icon={BookOpenCheck}
          />
          <Stat value="50+" label="expert instructors" icon={GraduationCap} />
          <Stat value="95%" label="learner satisfaction" icon={Heart} />
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Made for meaningful progress"
              title={
                <>
                  Explore our most
                  <br className="desktop-only" /> popular courses.
                </>
              }
              action={
                <Button to="/courses" variant="text">
                  View all courses <ArrowRight size={17} />
                </Button>
              }
            >
              From your first project to your next professional leap, find
              learning that meets you where you are.
            </SectionHeading>
          </Reveal>
          <div className="course-grid featured-grid">
            {courses.slice(0, 4).map((course, i) => (
              <Reveal key={course.id} delay={i * 0.07}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
          <div className="section-mobile-action">
            <Button to="/courses" variant="secondary">
              View all courses <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>
      <section className="section categories-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="A path for every curiosity"
              title="Find your learning lane."
              align="center"
            >
              Choose a subject that sparks something, then make it practical.
            </SectionHeading>
          </Reveal>
          <div className="category-grid">
            {categories.map((category, i) => (
              <Reveal key={category.name} delay={i * 0.045}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-layout">
          <Reveal className="why-visual">
            <div className="why-image-main">
              <img
                src={images.learning}
                alt="Teacher helping a student learn"
                loading="lazy"
              />
            </div>
            <div className="why-certificate">
              <span>
                <Award size={21} />
              </span>
              <div>
                <small>Skills, recognised</small>
                <strong>Certificate of completion</strong>
              </div>
              <BadgeCheck size={20} />
            </div>
            <div className="why-doodle">
              <svg viewBox="0 0 120 110">
                <path d="M9 89C22 60 41 29 79 20M67 11l13 9-1-16" />
              </svg>
            </div>
          </Reveal>
          <Reveal delay={0.14} className="why-copy">
            <span className="eyebrow">Learning with intention</span>
            <h2>Everything you need to turn curiosity into capability.</h2>
            <p>
              We believe the most useful learning feels clear, human and
              connected to the real world waiting outside the lesson.
            </p>
            <div className="benefit-list">
              <Benefit
                icon={GraduationCap}
                title="Expert instructors"
                text="Learn with people who do the work, not just talk about it."
              />
              <Benefit
                icon={MousePointer2}
                title="Practical by design"
                text="Build relevant projects you can proudly put to use."
              />
              <Benefit
                icon={Clock3}
                title="Your pace, your place"
                text="Learn when the moment is right—and return whenever you need."
              />
              <Benefit
                icon={Award}
                title="Proof of your progress"
                text="Celebrate completion with a shareable certificate."
              />
            </div>
            <Button to="/about" variant="text">
              Why EduLearn <ArrowRight size={17} />
            </Button>
          </Reveal>
        </div>
      </section>
      <section className="section works-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Simple, not simplistic"
              title="Your next chapter starts in four steps."
              align="center"
            />
          </Reveal>
          <div className="steps-grid">
            {[
              {
                icon: Compass,
                title: "Explore courses",
                text: "Follow your curiosity through skills that matter.",
              },
              {
                icon: Bookmark,
                title: "Choose your course",
                text: "Find a level and learning style that fits your life.",
              },
              {
                icon: CirclePlay,
                title: "Start learning",
                text: "Watch, practise, reflect and make progress at your pace.",
              },
              {
                icon: Rocket,
                title: "Build your future",
                text: "Take new confidence into work, life and everything next.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="step">
                  <span className="step-num">0{i + 1}</span>
                  <span className="step-icon">
                    <step.icon size={25} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {i < 3 && <span className="step-line" />}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="works-action">
            <Button to="/register" variant="secondary">
              Start your journey <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>
      <section className="section instructor-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Meet the mentors"
              title="Learn from people who practise what they teach."
              action={
                <Button to="/about#instructors" variant="text">
                  Meet our instructors <ArrowRight size={17} />
                </Button>
              }
            >
              A little more perspective, experience and encouragement in every
              lesson.
            </SectionHeading>
          </Reveal>
          <div className="instructor-grid">
            {instructors.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.07}>
                <article className="instructor-card">
                  <div className="instructor-image">
                    <img src={person.image} alt={person.name} loading="lazy" />
                    <div className="instructor-socials">
                      <a
                        aria-label={`${person.name} on LinkedIn`}
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BriefcaseBusiness size={16} />
                      </a>
                      <a
                        aria-label={`Email ${person.name}`}
                        href={`mailto:${person.name.toLowerCase().replace(" ", ".")}@edulearn.example`}
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="instructor-content">
                    <span>{person.expertise}</span>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                    <div>
                      <span>
                        <BookOpen size={14} /> {person.courses} courses
                      </span>
                      <span>
                        <Star size={14} fill="currentColor" /> {person.rating}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section experience-section">
        <div className="container experience-layout">
          <Reveal className="experience-copy">
            <span className="eyebrow">More than a video library</span>
            <h2>A learning experience that stays with you.</h2>
            <p>
              We brought the useful pieces together so every course feels like a
              space designed for real momentum.
            </p>
            <div className="experience-list">
              <span>
                <Video size={18} /> HD video lessons
              </span>
              <span>
                <Download size={18} /> Downloadable resources
              </span>
              <span>
                <ClipboardCheck size={18} /> Hands-on assignments
              </span>
              <span>
                <CircleHelp size={18} /> Quizzes that stick
              </span>
              <span>
                <Layers3 size={18} /> Portfolio-ready projects
              </span>
              <span>
                <TrendingUp size={18} /> Progress tracking
              </span>
              <span>
                <FileBadge size={18} /> Shareable certificates
              </span>
              <span>
                <Headphones size={18} /> Instructor support
              </span>
            </div>
            <Button to="/courses" variant="primary">
              Find a course <ArrowRight size={17} />
            </Button>
          </Reveal>
          <Reveal delay={0.15} className="dashboard-preview">
            <div className="preview-top">
              <div>
                <small>Good morning, Amna</small>
                <strong>Let’s make today count.</strong>
              </div>
              <span className="preview-avatar">A</span>
            </div>
            <div className="preview-course">
              <img src={images.coding} alt="" />
              <div>
                <small>Modern Web Development</small>
                <strong>Building responsive layouts</strong>
                <div className="preview-progress">
                  <i style={{ width: "68%" }} />
                </div>
                <span>68% completed</span>
              </div>
              <Link to="/courses/modern-web-development" className="preview-play" aria-label="Resume Modern Web Development course">
                <Play size={16} fill="currentColor" />
              </Link>
            </div>
            <div className="preview-bottom">
              <div className="chart-card">
                <div>
                  <span>Weekly rhythm</span>
                  <strong>4.8h</strong>
                </div>
                <div className="mini-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="certificate-mini">
                <span>
                  <Award size={18} />
                </span>
                <div>
                  <small>New milestone</small>
                  <strong>8 day streak</strong>
                </div>
              </div>
            </div>
            <div className="preview-note">
              <CheckCircle2 size={16} /> You are doing wonderfully.
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section testimonial-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Stories in progress"
              title="The good kind of transformation."
              align="center"
            >
              Because progress looks different for everyone—and it is worth
              celebrating.
            </SectionHeading>
          </Reveal>
          <Reveal>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              loop
              className="testimonial-swiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.name}>
                  <article className="testimonial-card">
                    <Quote className="quote-mark" size={48} />
                    <div className="stars">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={17} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote>“{item.quote}”</blockquote>
                    <div className="testimonial-person">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.course}</span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>
      </section>
      <section className="section cta-wrap">
        <div className="container">
          <Reveal>
            <div className="big-cta">
              <div className="cta-lines" />
              <span className="cta-star">✦</span>
              <div>
                <span className="eyebrow">Start somewhere meaningful</span>
                <h2>
                  Your next skill could
                  <br />
                  change your future.
                </h2>
                <p>
                  Start learning practical skills today, and take one thoughtful
                  step toward your goals.
                </p>
              </div>
              <div className="cta-actions">
                <Button to="/courses" variant="white">
                  Browse courses <ArrowRight size={18} />
                </Button>
                <Button to="/register" variant="outline-light">
                  Create free account
                </Button>
              </div>
              <span className="cta-arc">⌒</span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section journal-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="From the learning journal"
              title="Ideas for making progress feel possible."
              action={
                <Button to="/blog" variant="text">
                  Visit the journal <ArrowRight size={17} />
                </Button>
              }
            >
              A few thoughtful reads for wherever you are on the path.
            </SectionHeading>
          </Reveal>
          <div className="blog-preview-grid">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

function Benefit({ icon: Icon, title, text }) {
  return (
    <div className="benefit">
      <span>
        <Icon size={19} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card ${featured ? "blog-featured" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="blog-image">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span>{post.category}</span>
      </Link>
      <div className="blog-content">
        <div className="blog-meta">
          <span>{post.date}</span>
          <i /> <span>{post.time}</span>
        </div>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="article-link">
          Read article <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function CoursesPage() {
  useTitle(pageTitles["/courses"]);
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    params.get("category") || "All categories",
  );
  const [level, setLevel] = useState("All levels");
  const [price, setPrice] = useState("Any price");
  const [rating, setRating] = useState("Any rating");
  const [sort, setSort] = useState(params.get("sort") || "Featured");
  const [visible, setVisible] = useState(9);
  useEffect(() => {
    setCategory(params.get("category") || "All categories");
    setSort(params.get("sort") || "Featured");
  }, [params]);
  const filtered = useMemo(() => {
    let list = [...courses].filter(
      (c) =>
        (!query ||
          [c.title, c.category, c.instructor, c.description]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (category === "All categories" || c.category === category) &&
        (level === "All levels" || c.level === level) &&
        (price === "Any price" ||
          (price === "Under $25"
            ? c.salePrice < 25
            : price === "$25–$40"
              ? c.salePrice >= 25 && c.salePrice <= 40
              : c.salePrice > 40)) &&
        (rating === "Any rating" || c.rating >= Number(rating)),
    );
    if (sort === "Popular") list.sort((a, b) => b.students - a.students);
    if (sort === "Highest rated") list.sort((a, b) => b.rating - a.rating);
    if (sort === "Price: low to high")
      list.sort((a, b) => a.salePrice - b.salePrice);
    if (sort === "Newest")
      list = list
        .filter((_, i) => i % 2 === 0)
        .concat(list.filter((_, i) => i % 2));
    return list;
  }, [query, category, level, price, rating, sort]);
  const reset = () => {
    setQuery("");
    setCategory("All categories");
    setLevel("All levels");
    setPrice("Any price");
    setRating("Any rating");
    setSort("Featured");
  };
  return (
    <>
      <section className="page-hero courses-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Your curriculum, your way</span>
            <h1>
              Find a course that
              <br />
              <em>moves you forward.</em>
            </h1>
            <p>
              Explore practical learning created with the next version of you in
              mind.
            </p>
            <div className="course-search hero-search">
              <Search size={21} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(9);
                }}
                placeholder="What would you like to learn?"
                aria-label="Search courses"
              />
              <button
                onClick={() => setQuery("")}
                aria-label="Clear course search"
              >
                {query && <X size={18} />}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="courses-market section">
        <div className="container">
          <div className="market-toolbar">
            <div>
              <span className="results-count">
                <strong>{filtered.length}</strong> courses for curious minds
              </span>
            </div>
            <label className="sort-control">
              Sort by{" "}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setVisible(9);
                }}
              >
                <option>Featured</option>
                <option>Popular</option>
                <option>Highest rated</option>
                <option>Newest</option>
                <option>Price: low to high</option>
              </select>
            </label>
          </div>
          <div className="courses-layout">
            <aside className="course-filters">
              <div className="filter-heading">
                <span>
                  <SlidersHorizontal size={18} /> Filters
                </span>
                <button onClick={reset}>Reset</button>
              </div>
              <FilterSelect
                label="Category"
                value={category}
                onChange={(v) => {
                  setCategory(v);
                  setVisible(9);
                }}
                options={["All categories", ...categories.map((c) => c.name)]}
              />
              <FilterSelect
                label="Skill level"
                value={level}
                onChange={(v) => {
                  setLevel(v);
                  setVisible(9);
                }}
                options={["All levels", "Beginner", "Intermediate", "Advanced"]}
              />
              <FilterSelect
                label="Price"
                value={price}
                onChange={(v) => {
                  setPrice(v);
                  setVisible(9);
                }}
                options={["Any price", "Under $25", "$25–$40", "Over $40"]}
              />
              <FilterSelect
                label="Rating"
                value={rating}
                onChange={(v) => {
                  setRating(v);
                  setVisible(9);
                }}
                options={["Any rating", "4.9", "4.8", "4.7"]}
              />
              <div className="filter-support">
                <CircleHelp size={18} />
                <p>
                  Not sure where to begin?
                  <Link to="/faq"> Read our learner FAQ</Link>
                </p>
              </div>
            </aside>
            <div className="course-results">
              <div className="mobile-filter-summary">
                <SlidersHorizontal size={17} /> Showing {filtered.length}{" "}
                filtered courses
              </div>
              {filtered.length ? (
                <div className="course-grid market-grid">
                  {filtered.slice(0, visible).map((course) => (
                    <CourseCard course={course} key={course.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Search size={34} />
                  <h2>Nothing quite matches yet.</h2>
                  <p>Try a broader search or reset a few filters.</p>
                  <Button variant="secondary" onClick={reset}>
                    Clear filters
                  </Button>
                </div>
              )}
              {visible < filtered.length && (
                <div className="load-more">
                  <Button
                    variant="secondary"
                    onClick={() => setVisible((v) => v + 6)}
                  >
                    Load more courses <ChevronDown size={17} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Newsletter light />
    </>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="filter-select">
      <span>{label}</span>
      <div>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} />
      </div>
    </label>
  );
}

function CourseDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const course = courses.find((c) => c.id === id) || courses[0];
  const [openModule, setOpenModule] = useState(0);
  const [saved, setSaved] = useState(false);
  const enrolled = getEnrolled().includes(course.id);
  useTitle(`${course.title} | EduLearn`);
  const enroll = () => {
    const user = getUser();
    if (!user) {
      toast("Create an account to save your learning place.");
      nav("/register");
      return;
    }
    const ids = getEnrolled();
    if (!ids.includes(course.id)) setEnrolled([...ids, course.id]);
    toast(
      enrolled
        ? "You are already enrolled — opening your dashboard."
        : `You are enrolled in ${course.title}.`,
    );
    nav("/dashboard");
  };
  const save = () => {
    setSaved(!saved);
    toast(
      saved ? "Removed from your saved courses." : "Course saved for later.",
    );
  };
  const syllabus = [
    [
      "Welcome & your learning plan",
      [
        "A warm welcome to the course",
        "How to use the project workspace",
        "Setting your personal learning goal",
      ],
    ],
    [
      "Core foundations",
      [
        "The concepts that make everything click",
        "Guided practice: your first small win",
        "Knowledge check: build your recall",
      ],
    ],
    [
      "Build with confidence",
      [
        "A practical walkthrough from brief to outcome",
        "Troubleshooting the usual roadblocks",
        "Project lab: make it your own",
      ],
    ],
    [
      "Refine, present & grow",
      [
        "Making your work clear and polished",
        "Feedback frameworks you can reuse",
        "Final project and next steps",
      ],
    ],
    [
      "Bonus: keep the momentum",
      ["Career toolkit and useful templates", "Your 30-day practice plan"],
    ],
  ];
  const instructor = instructors.find((i) => i.name === course.instructor) || {
    name: course.instructor,
    role: "Experienced course instructor",
    expertise: course.category,
    courses: 6,
    rating: 4.8,
    image: images.teacherDesk,
  };
  return (
    <>
      <section className="course-detail-hero">
        <div className="container course-detail-grid">
          <div className="crumbs">
            <Link to="/courses">Courses</Link>
            <ChevronRight size={15} />
            <Link
              to={`/courses?category=${encodeURIComponent(course.category)}`}
            >
              {course.category}
            </Link>
          </div>
          <Reveal className="detail-copy">
            <span className={`course-tag tag-${course.color}`}>
              {course.tag}
            </span>
            <h1>{course.title}</h1>
            <p>
              {course.description} Learn by doing with bite-sized lessons and
              projects that have a place beyond the screen.
            </p>
            <div className="detail-rating">
              <span>
                <Star size={17} fill="currentColor" /> {course.rating} course
                rating
              </span>
              <u>{course.reviews.toLocaleString()} reviews</u>
              <span>
                <Users size={17} /> {course.students.toLocaleString()} students
              </span>
            </div>
            <p className="created-by">
              Created by <strong>{course.instructor}</strong> · Last updated
              March 2026
            </p>
            <div className="detail-quick">
              <span>
                <Clock3 size={17} />
                {course.duration} on-demand video
              </span>
              <span>
                <Globe2 size={17} />
                English
              </span>
              <span>
                <FileBadge size={17} />
                Certificate included
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="detail-enrol-card">
            <div className="detail-course-image">
              <img src={course.image} alt={course.title} />
              <button
                onClick={() =>
                  toast(
                    "A complimentary lesson preview is ready in the full course experience.",
                  )
                }
                aria-label="Watch course preview"
              >
                <Play fill="currentColor" size={22} />
              </button>
            </div>
            <div className="enrol-card-body">
              <div className="price-line">
                <strong>${course.salePrice}</strong>
                <span>${course.price}</span>
                <em>
                  {Math.round((1 - course.salePrice / course.price) * 100)}% off
                </em>
              </div>
              <Button onClick={enroll} className="full">
                {enrolled ? (
                  <>
                    Go to learning <ArrowRight size={17} />
                  </>
                ) : (
                  <>
                    Enroll now <ArrowRight size={17} />
                  </>
                )}
              </Button>
              <Button onClick={save} variant="secondary" className="full">
                {saved ? (
                  <>
                    <Check size={17} /> Saved for later
                  </>
                ) : (
                  <>
                    <Bookmark size={17} /> Save course
                  </>
                )}
              </Button>
              <p className="guarantee">
                <ShieldCheck size={16} /> 14-day learner happiness guarantee
              </p>
              <div className="enrol-includes">
                <strong>This course includes:</strong>
                <span>
                  <Video size={16} /> {course.duration} of video
                </span>
                <span>
                  <Download size={16} /> Downloadable resources
                </span>
                <span>
                  <FileBadge size={16} /> Certificate of completion
                </span>
                <span>
                  <InfinityIcon /> Lifetime access
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="course-detail-body section">
        <div className="container course-main-grid">
          <div className="course-main">
            <ContentBlock title="What you’ll learn">
              <div className="learn-grid">
                {[
                  "Turn key concepts into practical, repeatable skills",
                  "Build guided projects that make your progress visible",
                  "Make confident decisions with a useful creative process",
                  "Use proven tools and workflows used by professionals",
                  "Create work you can include in your portfolio or profile",
                  "Know exactly what to practise after the course ends",
                ].map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={18} />
                    {item}
                  </span>
                ))}
              </div>
            </ContentBlock>
            <ContentBlock title="A course built around real progress">
              <p>
                This course gives you a calm, clear route through the skills
                that matter. Each module brings together focused explanations,
                practical demonstrations and prompts that help you apply what
                you have learned straight away.
              </p>
              <p>
                You will leave with more than notes—you will have a repeatable
                process, useful work to show, and a clearer sense of what comes
                next.
              </p>
            </ContentBlock>
            <ContentBlock
              title="Course curriculum"
              subtitle={`${syllabus.length} modules · ${course.lessons} lessons · ${course.duration} total length`}
            >
              <div className="curriculum">
                {syllabus.map(([title, lessons], i) => (
                  <div
                    className={`curriculum-item ${openModule === i ? "open" : ""}`}
                    key={title}
                  >
                    <button
                      onClick={() => setOpenModule(openModule === i ? -1 : i)}
                      aria-expanded={openModule === i}
                    >
                      <span>
                        <ChevronDown size={18} />
                        <strong>
                          Module {i + 1}: {title}
                        </strong>
                      </span>
                      <small>{lessons.length} lessons</small>
                    </button>
                    <AnimatePresence>
                      {openModule === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="curriculum-lessons"
                        >
                          {lessons.map((lesson, j) => (
                            <div key={lesson}>
                              <CirclePlay size={16} />
                              <span>{lesson}</span>
                              <small>
                                {j === 0 && i === 0
                                  ? "Preview"
                                  : `${Math.max(7, 17 - i - j * 2)} min`}
                              </small>
                              {j === 0 && i === 0 && (
                                <button
                                  onClick={() =>
                                    toast(
                                      "A complimentary lesson preview is ready in the full course experience.",
                                    )
                                  }
                                >
                                  Preview
                                </button>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </ContentBlock>
            <ContentBlock title="Requirements">
              <ul className="content-list">
                <li>
                  No previous specialist experience required—just healthy
                  curiosity and a willingness to practise.
                </li>
                <li>
                  A laptop or desktop computer with a stable internet
                  connection.
                </li>
                <li>A little time each week to make the learning your own.</li>
              </ul>
            </ContentBlock>
            <ContentBlock title="Meet your instructor">
              <div className="detail-instructor">
                <img src={instructor.image} alt={instructor.name} />
                <div>
                  <span>{instructor.expertise}</span>
                  <h3>{instructor.name}</h3>
                  <p>
                    {instructor.role}. A generous guide who brings useful
                    experience into every lesson and believes good teaching
                    leaves room for your own ideas.
                  </p>
                  <div>
                    <span>
                      <Star size={15} fill="currentColor" /> {instructor.rating}{" "}
                      instructor rating
                    </span>
                    <span>
                      <Users size={15} /> 18,400 learners
                    </span>
                    <span>
                      <BookOpen size={15} /> {instructor.courses} courses
                    </span>
                  </div>
                </div>
              </div>
            </ContentBlock>
            <ContentBlock title="What learners are saying">
              <div className="course-reviews">
                {testimonials.slice(0, 2).map((t) => (
                  <article key={t.name}>
                    <div>
                      <img src={t.image} alt={t.name} />
                      <span>
                        <strong>{t.name}</strong>
                        <small>
                          <Star size={13} fill="currentColor" /> 5.0
                        </small>
                      </span>
                    </div>
                    <p>“{t.quote.slice(0, 165)}…”</p>
                  </article>
                ))}
              </div>
            </ContentBlock>
          </div>
          <aside className="course-side">
            <div className="side-card">
              <strong>Course at a glance</strong>
              <span>
                <Timer size={17} />
                <b>Duration</b>
                {course.duration}
              </span>
              <span>
                <BarChart3 size={17} />
                <b>Level</b>
                {course.level}
              </span>
              <span>
                <BookOpen size={17} />
                <b>Lessons</b>
                {course.lessons}
              </span>
              <span>
                <MonitorCog size={17} />
                <b>Access</b>Lifetime
              </span>
            </div>
            <div className="side-card subtle">
              <Heart size={20} />
              <strong>Learning is better shared.</strong>
              <p>Know someone who would love this course?</p>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast("Course link copied to your clipboard.");
                }}
              >
                <Copy size={15} /> Copy course link
              </button>
            </div>
          </aside>
        </div>
      </section>
      <section className="related-courses section">
        <div className="container">
          <SectionHeading
            eyebrow="Keep the momentum"
            title="You may also enjoy these."
          />
          <div className="course-grid">
            {courses
              .filter(
                (c) =>
                  c.id !== course.id &&
                  (c.category === course.category || c.level === course.level),
              )
              .slice(0, 3)
              .map((c) => (
                <CourseCard course={c} key={c.id} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
function InfinityIcon() {
  return <span className="tiny-infinity">∞</span>;
}
function ContentBlock({ title, subtitle, children }) {
  return (
    <section className="content-block">
      <div className="content-block-head">
        <h2>{title}</h2>
        {subtitle && <span>{subtitle}</span>}
      </div>
      {children}
    </section>
  );
}

function BlogPage() {
  useTitle(pageTitles["/blog"]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const cats = ["All", ...new Set(posts.map((p) => p.category))];
  const visible = posts.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      [p.title, p.excerpt, p.category]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const featured = posts[0];
  return (
    <>
      <section className="page-hero journal-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The EduLearn journal</span>
            <h1>
              Make room for
              <br />
              <em>good ideas.</em>
            </h1>
            <p>
              Fresh perspective for growing your skills, career and confidence.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="blog-page section">
        <div className="container">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="featured-article">
              <div className="featured-image">
                <img src={featured.image} alt={featured.title} />
                <span>Featured story</span>
              </div>
              <div className="featured-copy">
                <span className="eyebrow">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="author-line">
                  <span className="author-dot">
                    {featured.author
                      .split(" ")
                      .map((a) => a[0])
                      .join("")}
                  </span>
                  <span>
                    By {featured.author} <i /> {featured.date} <i />{" "}
                    {featured.time}
                  </span>
                </div>
                <span className="article-link">
                  Read the story <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="blog-tools">
            <div className="blog-search">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories"
                aria-label="Search blog posts"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear blog search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="blog-categories">
              {cats.map((c) => (
                <button
                  onClick={() => setActive(c)}
                  className={active === c ? "active" : ""}
                  key={c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="blog-layout">
            <div>
              {visible.length ? (
                <div className="blog-list-grid">
                  {visible
                    .filter(
                      (p) =>
                        p.slug !== featured.slug || query || active !== "All",
                    )
                    .map((p) => (
                      <BlogCard post={p} key={p.slug} />
                    ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Search size={34} />
                  <h2>No stories found.</h2>
                  <p>Try a different search or category.</p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setQuery("");
                      setActive("All");
                    }}
                  >
                    Show all stories
                  </Button>
                </div>
              )}
            </div>
            <aside className="blog-sidebar">
              <div>
                <h3>Popular reads</h3>
                {posts.slice(1, 4).map((p, i) => (
                  <Link
                    className="popular-post"
                    to={`/blog/${p.slug}`}
                    key={p.slug}
                  >
                    <span>0{i + 1}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <small>{p.time}</small>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="sidebar-note">
                <Sparkles size={20} />
                <h3>Keep your curiosity close.</h3>
                <p>New learning ideas in your inbox, once a month.</p>
                <Link to="/contact">
                  Stay in the loop <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Newsletter light />
    </>
  );
}

function BlogDetailPage() {
  const { slug } = useParams();
  const toast = useToast();
  const post = posts.find((p) => p.slug === slug) || posts[0];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  useTitle(`${post.title} | EduLearn`);
  return (
    <>
      <section className="article-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/blog">Learning journal</Link>
            <ChevronRight size={15} />
            <span>{post.category}</span>
          </div>
          <Reveal>
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="article-byline">
              <span className="author-dot large">
                {post.author
                  .split(" ")
                  .map((a) => a[0])
                  .join("")}
              </span>
              <span>
                <strong>{post.author}</strong>
                <small>
                  {post.date} · {post.time}
                </small>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
      <article className="article-page">
        <div className="article-cover">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="article-wrap">
          <aside className="share-rail">
            <span>Share</span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast("Article link copied to clipboard.");
              }}
              aria-label="Copy article link"
            >
              <Copy size={17} />
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on LinkedIn"
            >
              <BriefcaseBusiness size={17} />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(window.location.href)}`}
              aria-label="Share by email"
            >
              <Mail size={17} />
            </a>
          </aside>
          <div className="article-content">
            <p className="article-lead">
              When learning feels like a long list of things you ought to know,
              it is easy to lose the part that makes it powerful: your own
              curiosity. A better approach starts smaller—and more honestly.
            </p>
            <p>
              There is no shortage of advice about what to learn next. New tools
              appear, job descriptions evolve and the people around you seem to
              be moving quickly. But useful progress rarely comes from trying to
              hold all of that at once. It comes from choosing one clear
              direction, giving it your attention, and making something with it.
            </p>
            <h2>Start with a question worth following</h2>
            <p>
              The most sustainable learning begins with a question you genuinely
              want to answer. Instead of asking, “What skill is everyone else
              learning?”, try asking: “What would I like to be able to make,
              understand or contribute?” That question gives you a direction
              that can survive the inevitable difficult day.
            </p>
            <div className="article-callout">
              <Lightbulb size={24} />
              <div>
                <strong>A useful rule of thumb</strong>
                <p>
                  Choose a small project before you choose your whole future.
                  Projects create feedback; feedback creates clarity.
                </p>
              </div>
            </div>
            <h2>Make the first version deliberately small</h2>
            <p>
              Ambition is wonderful, but it is not a substitute for a starting
              point. Pick an early milestone you can reach in a week or two: a
              responsive page, a short analysis, a campaign idea, a redesigned
              screen. The goal is not to impress anyone yet. The goal is to
              prove to yourself that you can turn learning into movement.
            </p>
            <p>
              Once you have made one thing, the next lesson has context. A
              concept that felt abstract now has somewhere to land. You begin to
              see the gaps that matter and can ask better questions of a
              teacher, a peer or a search bar.
            </p>
            <figure>
              <img
                src={images.learning}
                alt="Teacher mentoring a student at a computer"
              />
              <figcaption>
                Practical learning becomes memorable when it is connected to
                something you have made.
              </figcaption>
            </figure>
            <h2>Build a rhythm you can return to</h2>
            <p>
              Consistency does not have to mean intensity. A learning rhythm can
              be two focused sessions each week, protected in the same way you
              would protect a conversation with someone important. Leave each
              session with a small note about where to begin next time. That
              simple act lowers the threshold for coming back.
            </p>
            <p>
              And remember: progress is allowed to look quiet. A clearer mental
              model, a useful habit, a first draft you are willing to
              revise—these are not side effects. They are the work.
            </p>
            <h2>Let your work be seen</h2>
            <p>
              When you are ready, share a project, a takeaway or a question. The
              point is not to perform your progress. It is to invite feedback
              and become part of a wider conversation. The people who grow
              steadily tend to stay close to people who are also making,
              learning and revising.
            </p>
            <p>
              At EduLearn, we design courses around that kind of progress: one
              idea, one practice, one useful piece of work at a time. The future
              does not ask you to know everything. It asks you to keep learning
              with intention.
            </p>
            <div className="article-end">
              <span>Was this useful?</span>
              <div>
                <button
                  onClick={() => toast("Thank you for the encouragement!")}
                >
                  <Heart size={16} /> Yes, thank you
                </button>
                <button
                  onClick={() =>
                    toast(
                      "We appreciate the feedback — we will make the next one even better.",
                    )
                  }
                >
                  <MessageCircle size={16} /> Not quite
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="section related-articles">
        <div className="container">
          <SectionHeading
            eyebrow="Keep reading"
            title="More ideas for your path."
          />
          <div className="blog-preview-grid">
            {related.map((p) => (
              <BlogCard post={p} key={p.slug} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter light />
    </>
  );
}

function AboutPage() {
  useTitle(pageTitles["/about"]);
  const values = [
    {
      icon: Heart,
      title: "Human first",
      text: "We make room for different starting points, ambitions and learning styles.",
    },
    {
      icon: Lightbulb,
      title: "Useful over noisy",
      text: "We focus on the skills, projects and ideas that travel with you into real life.",
    },
    {
      icon: Sparkles,
      title: "Progress, not perfection",
      text: "We celebrate the small wins that make new futures feel possible.",
    },
    {
      icon: Users,
      title: "Better together",
      text: "We build learning spaces that leave room for support, questions and connection.",
    },
  ];
  return (
    <>
      <section className="page-hero about-hero">
        <div className="container about-hero-grid">
          <Reveal>
            <span className="eyebrow">A learning company with heart</span>
            <h1>
              We are here for
              <br />
              <em>your becoming.</em>
            </h1>
            <p>
              EduLearn brings thoughtful teaching, practical skills and a little
              more encouragement to the people building what is next.
            </p>
            <Button to="/courses">
              Explore our courses <ArrowRight size={17} />
            </Button>
          </Reveal>
          <Reveal delay={0.14} className="about-photo">
            <img src={images.teacherDesk} alt="Educator supporting learners" />
            <div>
              <span>Since</span>
              <strong>2020</strong>
              <small>
                Helping people make
                <br />
                more of what they know.
              </small>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section story-section">
        <div className="container story-grid">
          <Reveal className="story-image">
            <img
              src={images.meeting}
              alt="Team collaborating around a laptop"
            />
            <span className="story-badge">
              <Users size={19} />
              <strong>50,000+</strong>
              <small>learner stories</small>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Our story</span>
            <h2>
              It started with a simple belief: learning should feel like an
              opening, not an obstacle.
            </h2>
            <p>
              EduLearn was shaped by teachers, makers and lifelong learners who
              wanted online education to feel more considered. Less like a
              content dump; more like a path you can actually follow.
            </p>
            <p>
              Today, we work with practitioners who care deeply about their
              craft and learners who are ready to make their next move. We are
              proud to be part of thousands of projects, career turns and quiet
              confidence shifts.
            </p>
            <Link to="/blog" className="article-link">
              Read our learning notes <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section mission-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="What guides us"
              title="A clearer, kinder way to learn."
              align="center"
            >
              Our mission is to make practical, career-shaping education feel
              attainable for anyone ready to begin.
            </SectionHeading>
          </Reveal>
          <div className="mission-grid">
            <Reveal>
              <div className="mission-card">
                <Target size={28} />
                <span>Our mission</span>
                <h3>
                  Open up opportunity through learning that people can actually
                  use.
                </h3>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mission-card dark">
                <Compass size={28} />
                <span>Our vision</span>
                <h3>
                  A world where more people have the confidence to shape their
                  own work and future.
                </h3>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The values we practise"
              title="Good learning has a point of view."
            />
          </Reveal>
          <div className="value-grid">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.07}>
                <article>
                  <span>
                    <value.icon size={23} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section about-stats">
        <div className="container">
          <div className="about-stat-inner">
            <Stat
              value="50K+"
              label="learners finding their rhythm"
              icon={Users}
            />
            <Stat
              value="100+"
              label="focused, practical courses"
              icon={BookOpen}
            />
            <Stat value="4.9" label="average course rating" icon={Star} />
            <Stat value="95%" label="would learn with us again" icon={Heart} />
          </div>
        </div>
      </section>
      <section id="instructors" className="section team-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The people behind the lessons"
              title="Experienced guides. Generous teachers."
              action={
                <Button to="/courses" variant="text">
                  Explore courses <ArrowRight size={17} />
                </Button>
              }
            >
              Our instructors bring the work into the learning—and know how to
              help it click.
            </SectionHeading>
          </Reveal>
          <div className="instructor-grid">
            {instructors.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.07}>
                <article className="instructor-card">
                  <div className="instructor-image">
                    <img src={person.image} alt={person.name} />
                    <div className="instructor-socials">
                      <a
                        aria-label={`${person.name} on LinkedIn`}
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BriefcaseBusiness size={16} />
                      </a>
                      <a
                        aria-label={`Email ${person.name}`}
                        href={`mailto:${person.name.toLowerCase().replace(" ", ".")}@edulearn.example`}
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="instructor-content">
                    <span>{person.expertise}</span>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                    <div>
                      <span>
                        <BookOpen size={14} /> {person.courses} courses
                      </span>
                      <span>
                        <Star size={14} fill="currentColor" /> {person.rating}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="about-cta">
        <div className="container">
          <Reveal>
            <div>
              <span className="eyebrow">Your story belongs here too</span>
              <h2>
                Ready to make space
                <br />
                for what is next?
              </h2>
              <Button to="/register" variant="white">
                Join EduLearn <ArrowRight size={17} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  useTitle(pageTitles["/contact"]);
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Add a valid email address.";
    if (!form.subject.trim())
      next.subject = "A subject helps us direct your note.";
    if (form.message.trim().length < 10)
      next.message = "Please add a little more detail (10 characters minimum).";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    toast("Message received. Our learner team will be in touch soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">We are listening</span>
            <h1>
              Let’s start a<br />
              <em>good conversation.</em>
            </h1>
            <p>
              Questions, course guidance or a thought you would like to share—we
              would love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <span className="eyebrow">Ways to reach us</span>
            <h2>Here when you need us.</h2>
            <p>
              Our learner experience team is a friendly bunch. We usually reply
              within one business day.
            </p>
            <div className="contact-methods">
              <a href="mailto:hello@edulearn.example">
                <span>
                  <Mail size={20} />
                </span>
                <div>
                  <small>Email us</small>
                  <strong>hello@edulearn.example</strong>
                </div>
                <ArrowUpRight size={17} />
              </a>
              <a href="tel:+924230200111">
                <span>
                  <Phone size={20} />
                </span>
                <div>
                  <small>Call us</small>
                  <strong>+92 42 3020 0111</strong>
                </div>
                <ArrowUpRight size={17} />
              </a>
              <a
                href="https://maps.google.com/?q=Gulberg+III+Lahore+Pakistan"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <MapPin size={20} />
                </span>
                <div>
                  <small>Find us</small>
                  <strong>Gulberg III, Lahore, Pakistan</strong>
                </div>
                <ArrowUpRight size={17} />
              </a>
              <div className="contact-hours">
                <span>
                  <Clock3 size={20} />
                </span>
                <div>
                  <small>Working hours</small>
                  <strong>Mon–Fri, 9:00 AM–6:00 PM PKT</strong>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <span>Follow the learning</span>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 size={18} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BriefcaseBusiness size={18} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                <CirclePlay size={19} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="contact-form-card">
            <div>
              <span className="eyebrow">Send a message</span>
              <h2>How can we help?</h2>
            </div>
            {sent && (
              <div className="form-success">
                <CheckCircle2 size={19} />
                <span>Thank you—your message is safely with our team.</span>
              </div>
            )}
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <FormField
                  label="Your name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="e.g. Areeba Khan"
                />
                <FormField
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-row">
                <FormField
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  placeholder="Optional"
                />
                <FormField
                  label="Subject"
                  value={form.subject}
                  onChange={(v) => update("subject", v)}
                  error={errors.subject}
                  placeholder="What can we help with?"
                />
              </div>
              <label
                className={`form-field ${errors.message ? "has-error" : ""}`}
              >
                <span>Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows="5"
                  placeholder="Tell us a little more about what you need…"
                />
                {errors.message && <small>{errors.message}</small>}
              </label>
              <Button type="submit">
                Send message <Send size={17} />
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
      <section className="map-section">
        <div className="map-bg">
          <div className="map-grid-lines" />
          <span className="map-pin">
            <MapPin size={27} fill="currentColor" />
          </span>
          <div className="map-card">
            <span>EduLearn Studio</span>
            <strong>Gulberg III, Lahore</strong>
            <a
              href="https://maps.google.com/?q=Gulberg+III+Lahore+Pakistan"
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function FormField({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <label className={`form-field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <small>{error}</small>}
    </label>
  );
}

function AuthLayout({ kind }) {
  const login = kind === "login";
  useTitle(login ? pageTitles["/login"] : pageTitles["/register"]);
  const nav = useNavigate();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [form, setForm] = useState(
    login
      ? { email: "", password: "", remember: false }
      : { name: "", email: "", password: "", confirm: "", terms: false },
  );
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const update = (key, v) => setForm((f) => ({ ...f, [key]: v }));
  const submit = (e) => {
    e.preventDefault();
    const n = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      n.email = "Please use a valid email address.";
    if (!form.password || form.password.length < 6)
      n.password = "Use at least 6 characters.";
    if (!login) {
      if (!form.name.trim()) n.name = "Please enter your full name.";
      if (form.password !== form.confirm)
        n.confirm = "Passwords need to match.";
      if (!form.terms) n.terms = "Please agree before continuing.";
    }
    setErrors(n);
    if (Object.keys(n).length) return;
    setProcessing(true);
    setTimeout(() => {
      const user = {
        name: login
          ? form.email
              .split("@")[0]
              .replace(/[._-]/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())
          : form.name,
        email: form.email,
      };
      localStorage.setItem("edulearn-user", JSON.stringify(user));
      if (!getEnrolled().length)
        setEnrolled([
          "modern-web-development",
          "ui-ux-design",
          "python-data-analysis",
        ]);
      setProcessing(false);
      toast(
        login
          ? "Welcome back—your learning space is ready."
          : "Welcome to EduLearn. Let’s make this count.",
      );
      nav("/dashboard");
    }, 700);
  };
  const reset = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(resetEmail))
      return toast("Please add a valid email address.", "error");
    setShowForgot(false);
    toast("If an account exists, a reset link has been sent.");
  };
  return (
    <>
      <section className="auth-page">
        <div className="auth-art">
          <Logo light />
          <div className="auth-art-copy">
            <span className="eyebrow">A little learning can change a lot</span>
            <h1>
              {login
                ? "Welcome back to your good work."
                : "A thoughtful start to what is next."}
            </h1>
            <p>
              {login
                ? "Pick up where curiosity left off. Your courses, progress and next small win are waiting."
                : "Join a community of curious people making more of what they know, one course at a time."}
            </p>
          </div>
          <div className="auth-quote">
            <Quote size={27} />
            <p>
              “The beautiful thing about learning is nobody can take it away
              from you.”
            </p>
            <span>— B.B. King</span>
          </div>
          <div className="auth-orb orb-a" />
          <div className="auth-orb orb-b" />
        </div>
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <Logo />
          </div>
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="auth-card-head">
              <span className="eyebrow">
                {login ? "Welcome back" : "Join EduLearn"}
              </span>
              <h2>
                {login ? "Sign in to continue." : "Create your free account."}
              </h2>
              <p>
                {login ? "New here? " : "Already have an account? "}
                <Link to={login ? "/register" : "/login"}>
                  {login ? "Create an account" : "Log in"}
                </Link>
              </p>
            </div>
            <form onSubmit={submit} noValidate>
              {!login && (
                <FormField
                  label="Full name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="e.g. Areeba Khan"
                />
              )}
              <FormField
                label="Email address"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="you@example.com"
              />
              <label
                className={`form-field ${errors.password ? "has-error" : ""}`}
              >
                <span>Password</span>
                <div className="password-field">
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <small>{errors.password}</small>}
              </label>
              {!login && (
                <label
                  className={`form-field ${errors.confirm ? "has-error" : ""}`}
                >
                  <span>Confirm password</span>
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    placeholder="Type it once more"
                  />
                  {errors.confirm && <small>{errors.confirm}</small>}
                </label>
              )}
              {login ? (
                <div className="auth-options">
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) => update("remember", e.target.checked)}
                    />
                    <span />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setShowForgot(true)}>
                    Forgot password?
                  </button>
                </div>
              ) : (
                <label className="check-label terms-label">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={(e) => update("terms", e.target.checked)}
                  />
                  <span />I agree to the <Link to="/terms">Terms</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>.
                </label>
              )}
              {errors.terms && (
                <small className="form-error">{errors.terms}</small>
              )}
              <Button type="submit" className="full" disabled={processing}>
                {processing ? (
                  <>
                    <span className="spinner" /> Please wait
                  </>
                ) : (
                  <>
                    {login ? "Log in to EduLearn" : "Create free account"}{" "}
                    <ArrowRight size={17} />
                  </>
                )}
              </Button>
            </form>
            <div className="auth-divider">
              <span>or continue with</span>
            </div>
            <button
              className="social-login"
              type="button"
              onClick={() => {
                const demoUser = { name: "Google Learner", email: "learner@google.demo" };
                localStorage.setItem("edulearn-user", JSON.stringify(demoUser));
                if (!getEnrolled().length) setEnrolled(["modern-web-development", "ui-ux-design", "python-data-analysis"]);
                toast("Welcome, Google Learner — your demo learning space is ready.");
                nav("/dashboard");
              }}
            >
              <span className="google-mark">G</span> Google
            </button>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {showForgot && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="reset-modal"
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
            >
              <button
                className="modal-close"
                onClick={() => setShowForgot(false)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
              <span className="modal-icon">
                <LockKeyhole size={22} />
              </span>
              <h2>Reset your password</h2>
              <p>
                Enter the email linked to your account and we will send reset
                instructions.
              </p>
              <form onSubmit={reset}>
                <label className="form-field">
                  <span>Email address</span>
                  <input
                    autoFocus
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                <Button type="submit" className="full">
                  Send reset link <ArrowRight size={17} />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DashboardPage() {
  useTitle(pageTitles["/dashboard"]);
  const nav = useNavigate();
  const toast = useToast();
  const user = getUser();
  const [active, setActive] = useState("Overview");
  const [enrolled, setCourses] = useState(getEnrolled());
  const dashCourses = (
    enrolled.length
      ? enrolled
      : ["modern-web-development", "ui-ux-design", "python-data-analysis"]
  )
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);
  const progress = [68, 42, 91, 29];
  if (!user)
    return (
      <section className="dashboard-gate">
        <div>
          <Logo />
          <span className="eyebrow">Your personal learning space</span>
          <h1>
            Sign in to see your
            <br />
            <em>learning story.</em>
          </h1>
          <p>
            Courses, progress, certificates and all the little wins live here.
          </p>
          <div>
            <Button to="/login">
              Log in <ArrowRight size={17} />
            </Button>
            <Button to="/register" variant="secondary">
              Create an account
            </Button>
          </div>
        </div>
        <img src={images.hero} alt="Student working on a laptop" />
      </section>
    );
  const removeSaved = (course) => {
    setCourses((x) => x.filter((id) => id !== course.id));
    setEnrolled(enrolled.filter((id) => id !== course.id));
    toast(`${course.title} removed from your dashboard.`);
  };
  return (
    <section className="dashboard-page">
      <aside className="dashboard-nav">
        <Logo />
        <nav>
          {[
            { i: LayoutDashboard, l: "Overview" },
            { i: BookOpen, l: "My learning" },
            { i: Bookmark, l: "Saved courses" },
            { i: Award, l: "Certificates" },
            { i: Settings2, l: "Settings" },
          ].map((item) => (
            <button
              key={item.l}
              className={active === item.l ? "active" : ""}
              onClick={() => {
                setActive(item.l);
                toast(`${item.l} selected.`);
              }}
            >
              <item.i size={18} />
              {item.l}
            </button>
          ))}
        </nav>
        <div className="dashboard-side-bottom">
          <Link to="/courses">
            <Plus size={17} /> Find a course
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("edulearn-user");
              toast("You have been logged out.");
              nav("/");
            }}
          >
            <LogIn size={17} /> Log out
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">
              {active === "Overview" ? "Your learning space" : active}
            </span>
            <h1>
              {active === "Overview" ? (
                <>
                  Good morning, {user.name.split(" ")[0]} <span>✦</span>
                </>
              ) : (
                active
              )}
            </h1>
            <p>
              {active === "Overview"
                ? "Small steps still count. Here is where you are today."
                : "Keep your learning organized and close."}
            </p>
          </div>
          <div className="dashboard-head-actions">
            <button
              onClick={() => toast("You are all caught up!")}
              aria-label="Notifications"
            >
              <Bell size={19} />
              <i />
            </button>
            <span className="user-avatar">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        </header>
        <div className="dash-stats">
          <DashStat
            icon={Clock3}
            number="12.4h"
            label="learning this week"
            trend="+18%"
          />
          <DashStat
            icon={BookOpenCheck}
            number={`${dashCourses.length}`}
            label="courses in progress"
            trend="On track"
          />
          <DashStat
            icon={Trophy}
            number="4"
            label="skills unlocked"
            trend="+1 this month"
          />
          <DashStat
            icon={FlameIcon}
            number="8 days"
            label="learning streak"
            trend="Personal best"
          />
        </div>
        <section className="continue-section">
          <div className="dash-section-head">
            <div>
              <h2>Continue learning</h2>
              <p>Pick up exactly where you left off.</p>
            </div>
            <Link to="/courses">
              Explore all <ArrowRight size={16} />
            </Link>
          </div>
          {dashCourses.length ? (
            <div className="continue-grid">
              {dashCourses.slice(0, 3).map((course, i) => (
                <article className="continue-card" key={course.id}>
                  <img src={course.image} alt={course.title} />
                  <div>
                    <span>{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>
                      Lesson{" "}
                      {Math.max(
                        3,
                        Math.round((course.lessons * progress[i]) / 100),
                      )}{" "}
                      of {course.lessons} · {progress[i]}% complete
                    </p>
                    <div className="course-progress">
                      <i style={{ width: `${progress[i]}%` }} />
                    </div>
                    <div className="continue-actions">
                      <Link to={`/courses/${course.id}`}>
                        <Play size={15} fill="currentColor" />{" "}
                        {progress[i] === 91 ? "Finish course" : "Continue"}
                      </Link>
                      <button
                        onClick={() => removeSaved(course)}
                        aria-label={`Remove ${course.title}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state dash-empty">
              <BookOpen size={34} />
              <h2>Your next course is waiting.</h2>
              <p>Explore a subject that sparks something.</p>
              <Button to="/courses">Explore courses</Button>
            </div>
          )}
        </section>
        <div className="dashboard-lower">
          <section className="dash-panel progress-panel">
            <div className="dash-section-head">
              <div>
                <h2>Your momentum</h2>
                <p>Your learning time, in a glance.</p>
              </div>
              <button
                onClick={() =>
                  toast(
                    "You completed 4.8 hours this week—an excellent rhythm.",
                  )
                }
              >
                This week <ChevronDown size={15} />
              </button>
            </div>
            <div className="momentum-chart">
              <div className="chart-y">
                <span>6h</span>
                <span>4h</span>
                <span>2h</span>
                <span>0h</span>
              </div>
              <div className="bar-chart">
                {[32, 54, 38, 73, 48, 88, 64].map((h, i) => (
                  <div key={i} className={i === 5 ? "today" : ""}>
                    <i style={{ height: `${h}%` }} />
                    <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="momentum-footer">
              <span>
                <i /> This week <strong>4.8 hours</strong>
              </span>
              <span>
                <TrendingUp size={16} /> +18% from last week
              </span>
            </div>
          </section>
          <section className="dash-panel upcoming-panel">
            <div className="dash-section-head">
              <div>
                <h2>Up next</h2>
                <p>A gentle nudge for today.</p>
              </div>
            </div>
            <div className="up-next">
              <span className="calendar-icon">
                <CalendarDays size={21} />
              </span>
              <div>
                <strong>Design critique: hierarchy</strong>
                <p>UI/UX Design · 22 min</p>
                <button
                  onClick={() => {
                    toast("Marked as ready for your next study session.");
                  }}
                >
                  Add to today <Plus size={15} />
                </button>
              </div>
            </div>
            <div className="streak-card">
              <span>🔥</span>
              <div>
                <strong>8-day learning streak</strong>
                <p>Two more days to beat your best.</p>
              </div>
            </div>
          </section>
        </div>
        <section className="cert-section">
          <div className="dash-section-head">
            <div>
              <h2>Recent achievements</h2>
              <p>Proof of all that showing up.</p>
            </div>
            <button
              onClick={() =>
                toast("Your achievement history is all up to date.")
              }
            >
              View all <ArrowRight size={16} />
            </button>
          </div>
          <div className="achievement-row">
            <div>
              <span className="achievement-icon">
                <Award size={22} />
              </span>
              <div>
                <strong>Data Explorer</strong>
                <p>Completed Python for Data Analysis</p>
              </div>
              <span className="achievement-date">Mar 12, 2026</span>
              <button
                onClick={() => toast("Certificate downloaded to your device.")}
              >
                <Download size={17} /> Download
              </button>
            </div>
          </div>
          <div className="achievement-row">
            <div>
              <span className="achievement-icon peach">
                <Zap size={22} />
              </span>
              <div>
                <strong>Seven Day Spark</strong>
                <p>Maintained a 7 day study streak</p>
              </div>
              <span className="achievement-date">Mar 10, 2026</span>
              <button
                onClick={() => toast("Achievement shared to your profile.")}
              >
                <ShareIcon /> Share
              </button>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
function DashStat({ icon: Icon, number, label, trend }) {
  return (
    <article>
      <span>
        <Icon size={20} />
      </span>
      <div>
        <strong>{number}</strong>
        <p>{label}</p>
      </div>
      <small>{trend}</small>
    </article>
  );
}
function FlameIcon(props) {
  return <span {...props}>🔥</span>;
}
function ShareIcon() {
  return <Send size={15} />;
}

function FAQPage() {
  useTitle(pageTitles["/faq"]);
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="page-hero faq-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Helpful answers, right here</span>
            <h1>
              Questions are part
              <br />
              of <em>the learning.</em>
            </h1>
            <p>Find clear answers to the things learners often ask us.</p>
          </Reveal>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-layout">
          <Reveal className="faq-aside">
            <span className="eyebrow">Common questions</span>
            <h2>A little clarity goes a long way.</h2>
            <p>
              Can’t spot the answer you need? Our learner support team is only a
              message away.
            </p>
            <Button to="/contact" variant="secondary">
              Talk to our team <MessageCircle size={17} />
            </Button>
            <div className="faq-aside-card">
              <Headphones size={22} />
              <strong>Need course guidance?</strong>
              <p>
                Tell us where you want to go. We will help you choose a useful
                first step.
              </p>
              <Link to="/courses">
                Explore courses <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item ${open === i ? "open" : ""}`} key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{f.q}</span>
                  <ChevronDown size={20} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <Newsletter light />
    </>
  );
}

function LegalPage({ type }) {
  const privacy = type === "privacy";
  useTitle(privacy ? pageTitles["/privacy"] : pageTitles["/terms"]);
  const title = privacy
    ? "Privacy that respects you."
    : "Terms built on clarity.";
  const intro = privacy
    ? "Your trust matters. This policy explains what we collect, why we collect it and how we take care of it."
    : "These terms help keep EduLearn useful, safe and fair for everyone who learns with us.";
  const sections = privacy
    ? [
        [
          "The information we collect",
          "We collect information you choose to share when you create an account, enroll in a course, contact support or subscribe to updates. This can include your name, email address, learning activity and messages you send us.",
        ],
        [
          "How we use it",
          "We use this information to deliver courses, personalise your learning experience, respond to your questions and improve EduLearn. We only send marketing updates when you have chosen to receive them.",
        ],
        [
          "Keeping your information safe",
          "We use sensible technical and organisational measures to protect the information in our care. No online service can promise absolute security, but we continually work to keep our systems and practices current.",
        ],
        [
          "Your choices",
          "You can update your account information, manage email preferences or request account deletion by contacting hello@edulearn.example. We will respond to privacy requests as promptly as we can.",
        ],
        [
          "Updates to this policy",
          "If we make meaningful changes, we will update this page and revise the date below. Continuing to use EduLearn after a change means you accept the updated policy.",
        ],
      ]
    : [
        [
          "Using EduLearn",
          "When you create an EduLearn account, please provide accurate information and keep your login details safe. You are responsible for activity carried out through your account.",
        ],
        [
          "Courses and access",
          "Enrolment gives you personal access to the course material. Course content, resources and certificates are for your own learning and may not be copied, shared or resold without written permission.",
        ],
        [
          "Payments and refunds",
          "Course prices are shown at checkout. If a course is not right for you, contact learner support within 14 days of purchase and we will guide you through the available refund options.",
        ],
        [
          "Community care",
          "We welcome thoughtful questions and generous participation. Please do not use our learning spaces to harass, mislead or infringe the rights of others.",
        ],
        [
          "Changes to these terms",
          "As EduLearn evolves, we may update these terms. We will post the current version here and update the effective date.",
        ],
      ];
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">
              {privacy
                ? "Your information, handled with care"
                : "The practical details"}
            </span>
            <h1>{title}</h1>
            <p>{intro}</p>
            <span className="legal-date">Last updated: October 4, 2026</span>
          </Reveal>
        </div>
      </section>
      <section className="section legal-body">
        <div className="container legal-layout">
          <aside>
            <strong>On this page</strong>
            {sections.map((s, i) => (
              <a key={s[0]} href={`#legal-${i + 1}`}>
                {i + 1}. {s[0]}
              </a>
            ))}
            <Link to="/contact">
              <MessageCircle size={16} /> Questions? Contact us
            </Link>
          </aside>
          <article>
            <p className="legal-lead">
              We want the practical details to be as clear as the learning
              experience itself. Please take a moment to read this page. If
              anything is unclear, our team is happy to help.
            </p>
            {sections.map((s, i) => (
              <section id={`legal-${i + 1}`} key={s[0]}>
                <span>0{i + 1}</span>
                <h2>{s[0]}</h2>
                <p>{s[1]}</p>
                <p>
                  {privacy
                    ? "We do not sell personal information. We only share information with trusted service providers when it is necessary to provide EduLearn, meet legal obligations or protect the safety of our community."
                    : "By using EduLearn, you agree to use the platform lawfully and with respect for the people and work behind it. These terms are governed by the laws applicable to our registered operations."}
                </p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  useTitle("Page not found | EduLearn");
  return (
    <section className="not-found">
      <span className="eyebrow">404</span>
      <h1>That page took a study break.</h1>
      <p>Let’s get you back to somewhere useful.</p>
      <Button to="/">
        Go home <ArrowRight size={17} />
      </Button>
    </section>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<AuthLayout kind="login" />} />
          <Route path="/register" element={<AuthLayout kind="register" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ToastProvider>
  );
}
