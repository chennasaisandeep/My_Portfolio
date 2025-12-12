const { useState, useEffect } = React;

let content = null;

// --- COMPONENTS ---

const Button = ({ children, primary, onClick, href, icon }) => {
    const baseClass = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 cursor-pointer";
    const primaryClass = "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 border border-transparent";
    const secondaryClass = "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300";
    
    const btnContent = (
        <>
            {children}
            {icon && <i className={`ml-2 ${icon}`}></i>}
        </>
    );

    if (href) {
        return <a href={href} target={href.startsWith('http') || href.endsWith('.pdf') ? "_blank" : "_self"} className={`${baseClass} ${primary ? primaryClass : secondaryClass}`}>{btnContent}</a>;
    }
    return <button onClick={onClick} className={`${baseClass} ${primary ? primaryClass : secondaryClass}`}>{btnContent}</button>;
};

const Section = ({ id, className = "", children }) => (
    <section id={id} className={`px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
        {children}
    </section>
);

// -- MODAL FOR HOBBIES --
const HobbyModal = ({ hobby, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    if (!hobby) return null;

    const hasGallery = hobby.gallery && hobby.gallery.length > 0;
    const hasCert = !!hobby.certificate;
    const hasPlaylists = hobby.playlists && Object.keys(hobby.playlists).length > 0;

    // Set first playlist as default when modal opens
    React.useEffect(() => {
        if (hasPlaylists && !selectedPlaylist) {
            setSelectedPlaylist(Object.keys(hobby.playlists)[0]);
        }
    }, [hasPlaylists, selectedPlaylist, hobby]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const nextImage = () => {
        if (hasGallery) setCurrentIndex((prev) => (prev + 1) % hobby.gallery.length);
    };

    const prevImage = () => {
        if (hasGallery) setCurrentIndex((prev) => (prev - 1 + hobby.gallery.length) % hobby.gallery.length);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10">
                <i className="fas fa-times text-3xl"></i>
            </button>

            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[90vh] md:h-[90vh] overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 flex-shrink-0 rounded-t-2xl">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                        <i className={`fas ${hobby.icon}`}></i> {hobby.name}
                    </h3>
                    {hasGallery && <span className="text-sm text-blue-100">{currentIndex + 1} / {hobby.gallery.length}</span>}
                </div>

                <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                    {hasGallery ? (
                        <div className="bg-black relative overflow-hidden h-[50vh] md:flex-1 md:min-h-0">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <img 
                                    src={hobby.gallery[currentIndex]} 
                                    alt={`${hobby.name} Gallery ${currentIndex + 1}`} 
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {console.error('Image failed to load:', e.target.src); e.target.src='https://via.placeholder.com/800x600?text=Image+Not+Found'}}
                                />
                            </div>
                            {hobby.gallery.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-all z-10">
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-all z-10">
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    ) : hasCert ? (
                        <div className="bg-black relative overflow-hidden h-[50vh] md:flex-1 md:min-h-0">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <img 
                                    src={hobby.certificate} 
                                    alt="Certificate" 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    ) : hasPlaylists ? (
                        <div className="flex-1 bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800 overflow-y-auto flex flex-col min-h-0 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            {/* Playlist Tabs - Sticky */}
                            <div className="sticky top-0 z-10 pt-4 px-6 pb-3 backdrop-blur-md bg-slate-1000/40 mb-2">
                                <div className="flex md:flex-wrap gap-2 overflow-x-auto scrollbar-hide pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                                    {Object.keys(hobby.playlists).map((playlistName) => (
                                        <button
                                            key={playlistName}
                                            onClick={() => setSelectedPlaylist(playlistName)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all ${
                                                selectedPlaylist === playlistName 
                                                    ? 'bg-green-500 text-white shadow-lg' 
                                                    : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                        >
                                            {playlistName}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Song List */}
                            <div className="px-6 pb-6">
                                <div className="space-y-2">
                                    {selectedPlaylist && hobby.playlists[selectedPlaylist].map((song, idx) => (
                                        <a 
                                            key={idx}
                                            href={song.link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all group cursor-pointer backdrop-blur-sm block"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-white/60 group-hover:bg-green-500 group-hover:text-white transition-all">
                                                    <i className="fas fa-play text-sm"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-white group-hover:text-green-400 transition-colors">{song.title}</div>
                                                    <div className="text-sm text-white/60">{song.artist}</div>
                                                </div>
                                                <div className="text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                                                    {song.link && <i className="fas fa-external-link-alt"></i>}
                                                    <i className="fas fa-heart"></i>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-slate-50">
                            <div className="text-center text-gray-400">
                                <i className="fas fa-info-circle text-4xl mb-4"></i>
                                <p>No content available for this hobby.</p>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className={`bg-white border-t border-gray-100 flex-shrink-0 rounded-b-2xl ${hasPlaylists ? 'p-3' : 'p-4 md:p-6'}`}>
                    <p className="text-gray-600 text-sm">{hobby.description}</p>
                </div>
            </div>
        </div>
    );
};

const ProjectDetail = ({ project, onBack }) => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    
    return (
        <div className="min-h-screen bg-white animate-fade-in">
            <div className={`relative h-60 w-full bg-gradient-to-br ${project.gradient} flex items-end p-8 md:p-12`}>
                <button onClick={onBack} className="absolute top-6 left-6 bg-black/20 hover:bg-black/40 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all flex items-center">
                    <i className="fas fa-arrow-left mr-2"></i> Back
                </button>
                <div className="text-white w-full max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
                    <div className="flex gap-4 opacity-90">
                        <span>{project.role}</span>•<span>{project.year}</span>
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
                <div className="flex gap-4 mb-10 border-b border-gray-100 pb-6">
                    {project.links.github && (
                        <a href={project.links.github} target="_blank" className="flex items-center text-gray-700 hover:text-black font-semibold">
                            <i className="fab fa-github text-xl mr-2"></i> View Code
                        </a>
                    )}
                    {project.links.paper && (
                        <a href={project.links.paper} target="_blank" className="flex items-center text-gray-700 hover:text-black font-semibold">
                            <i className="fas fa-external-link-alt text-xl mr-2"></i> Read Paper
                        </a>
                    )}
                </div>

                <div className="space-y-10">
                    {project.contentBlocks.map((block, idx) => (
                        <div key={idx}>
                            {block.title && <h3 className="text-xl font-bold text-gray-900 mb-3">{block.title}</h3>}
                            
                            {block.type === 'text' && <p className="text-gray-600 leading-relaxed text-lg">{block.value}</p>}
                            
                            {block.type === 'list' && (
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {block.items.map((item, i) => (
                                        <li key={i} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <i className="fas fa-check-circle text-blue-500 mr-3"></i> {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {block.type === 'metrics' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {block.data.map((m, i) => (
                                        <div key={i} className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                                            <div className="text-2xl font-bold text-blue-600">{m.value}</div>
                                            <div className="text-xs font-bold text-gray-500 uppercase">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedHobby, setSelectedHobby] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeProject = content.projects.find(p => p.id === selectedId);

    const handleNav = (id) => {
        setMobileMenuOpen(false);
        if (selectedId) {
            setSelectedId(null);
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleProjectClick = (projectId) => {
        setScrollPosition(window.scrollY);
        setSelectedId(projectId);
    };

    if (selectedId && activeProject) {
        return <ProjectDetail project={activeProject} onBack={() => {
            setSelectedId(null);
            setTimeout(() => window.scrollTo(0, scrollPosition), 0);
        }} />;
    }

    return (
        <div className="min-h-screen">
            {/* Hobby Modal */}
            {selectedHobby && <HobbyModal hobby={selectedHobby} onClose={() => setSelectedHobby(null)} />}
            
            {/* Certificate Modal */}
            {selectedCertificate && <HobbyModal hobby={{...selectedCertificate, gallery: selectedCertificate.images}} onClose={() => setSelectedCertificate(null)} />}

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                        {content.site.logo}
                    </div>
                    
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {content.site.nav.map(item => (
                            <button key={item.id} onClick={() => handleNav(item.id)} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">{item.label}</button>
                        ))}
                        <a href={content.site.socials.email} className="ml-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all">Hire Me</a>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-fade-in-up">
                        {content.site.nav.map(item => (
                            <button key={item.id} onClick={() => handleNav(item.id)} className="text-left text-lg font-medium py-2">{item.label}</button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero */}
            <header className="pt-24 pb-16 px-6 md:px-12 md:pt-32 md:pb-24 max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">{content.hero.headline}</h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl">{content.hero.subheadline}</p>
                    <div className="flex flex-wrap gap-4 mb-16">
                        {content.hero.ctas.map((cta, i) => (
                            <Button key={i} primary={cta.primary} onClick={() => cta.action === 'resume' ? window.open(cta.href, '_blank') : handleNav(cta.action)} href={cta.href}>{cta.label}</Button>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
                        {content.hero.metrics.map((m, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-slate-900">{m.value}</div>
                                <div className="text-sm text-slate-500 font-medium">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Work Grid */}
            <Section id="work" className="py-6 bg-slate-50/50">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-3">Selected Work</h2>
                    <p className="text-gray-500">Highlighting projects in ML and Data Analysis.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {content.projects.map(project => (
                        <div key={project.id} onClick={() => handleProjectClick(project.id)} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full">
                            <div className={`h-24 w-full bg-gradient-to-br ${project.gradient} relative p-6 flex flex-col justify-end`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                                <h3 className="relative text-white text-xl font-bold shadow-sm">{project.title}</h3>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.slice(0,3).map(t => <span key={t} className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">{t}</span>)}
                                </div>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">{project.summary}</p>
                                <div className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                                    View Case Study <i className="fas fa-arrow-right ml-2"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Experience */}
            <Section id="experience" className="py-6">
                <h2 className="text-3xl font-bold mb-8">Experience</h2>
                <div className="space-y-4">
                    {content.experience.map((exp, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12">
                            <div className="md:w-1/4 pt-1">
                                <div className="font-bold text-blue-600">{exp.period}</div>
                            </div>
                            <div className="md:w-3/4 border-l-2 border-gray-100 pl-8 pb-8 relative">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                                <h3 className="text-xl font-bold">{exp.role}</h3>
                                <div className="text-gray-500 mb-3">{exp.company} • {exp.location}</div>
                                <p className="text-gray-600 mb-3">{exp.summary}</p>
                                <ul className="space-y-1">
                                    {exp.achievements.map((a, j) => (
                                        <li key={j} className="text-sm text-gray-500 flex items-start">
                                            <i className="fas fa-caret-right text-gray-400 mt-1 mr-2"></i> {a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Education */}
            <Section id="education" className="py-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-3">Education</h2>
                    <p className="text-gray-500">Academic background and qualifications.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {content.education.map((edu, i) => (
                        <div key={i} className="bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <i className={`fas ${edu.icon} text-2xl text-white`}></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl text-gray-900 mb-1">{edu.school}</h3>
                                    <p className="text-blue-600 font-semibold mb-2">{edu.degree}</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-calendar text-gray-400"></i>
                                            {edu.year}
                                        </span>
                                        <span className="text-gray-300 hidden sm:inline">•</span>
                                        <span className="flex items-center gap-1">
                                            <i className="fas fa-star text-yellow-500"></i>
                                            {edu.grade}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Skills */}
            <Section id="skills" className="py-6 bg-slate-50">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-3">Skills & Technologies</h2>
                    <p className="text-gray-500">Technical expertise across multiple domains.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(content.skills.reduce((acc, skill) => {
                        (acc[skill.category] = acc[skill.category] || []).push(skill);
                        return acc;
                    }, {})).map(([category, skills]) => (
                        <div key={category} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {skills.map(s => (
                                    <li key={s.name} className="text-gray-600 text-sm flex items-center gap-2 group">
                                        <i className="fas fa-check text-blue-600 text-xs group-hover:scale-125 transition-transform"></i>
                                        <span className="group-hover:text-gray-900 transition-colors">{s.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Certificates & Hobbies */}
            <Section id="certificates" className="py-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    
                    {/* Certificates Column */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Certificates</h2>
                        <div className="space-y-3">
                            {content.certificates.map((cert, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => {
                                        if (cert.images && cert.images.length > 0) {
                                            setSelectedCertificate(cert);
                                        } else if (cert.link) {
                                            window.open(cert.link, '_blank');
                                        }
                                    }}
                                    className={`bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4 transition-all hover:shadow-md ${
                                        (cert.images && cert.images.length > 0) || cert.link ? 'cursor-pointer group' : ''
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 ${
                                        (cert.images && cert.images.length > 0) || cert.link ? 'group-hover:bg-blue-600 group-hover:text-white' : ''
                                    } transition-colors`}>
                                        <i className={`${cert.icon || 'fas fa-certificate'} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            {cert.name}
                                            {((cert.images && cert.images.length > 0) || cert.link) && <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-blue-600 transition-colors"></i>}
                                        </h3>
                                        <div className="text-sm text-blue-600 mb-2 font-medium">{cert.issuer}</div>
                                        <p className="text-sm text-gray-500">{cert.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hobbies Column */}
                    <div id="hobbies" style={{scrollMarginTop: '25px'}}>
                        <h2 className="text-3xl font-bold mb-8">Interests & Hobbies</h2>
                        <div className="space-y-3">
                            {content.hobbies.map((hobby, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => (hobby.gallery || hobby.certificate || hobby.playlists) && setSelectedHobby(hobby)}
                                    className={`bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4 transition-all ${
                                        (hobby.gallery || hobby.certificate || hobby.playlists) ? 'hover:shadow-md cursor-pointer group' : ''
                                    }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <i className={`fas ${hobby.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            {hobby.name}
                                            {(hobby.gallery || hobby.certificate || hobby.playlists) && <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-blue-600 transition-colors"></i>}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2">{hobby.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Section>

            {/* Footer / Contact */}
            <Section id="contact" className="py-12 text-center pb-20 bg-gradient-to-t from-gray-50 to-white">
                <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-10">
                    Looking for opportunities? I'm just an email away.
                </p>
                <div className="flex justify-center gap-6 mb-16">
                    <a href={content.site.socials.linkedin} target="_blank" className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xl transition-all"><i className="fab fa-linkedin-in"></i></a>
                    <a href={content.site.socials.github} target="_blank" className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center text-xl transition-all"><i className="fab fa-github"></i></a>
                    <a href={content.site.socials.email} className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xl transition-all"><i className="fas fa-envelope"></i></a>
                </div>
                <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {content.site.title}. All rights reserved.</p>
            </Section>
        </div>
    );
};

const init = async () => {
    try {
        // Check if portfolioData is available globally
        if (window.portfolioData) {
            content = window.portfolioData;
        } else {
            // Fallback for server environments if needed, or throw error
            const response = await fetch('data/portfolio.json');
            content = await response.json();
        }
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    } catch (error) {
        console.error("Failed to load portfolio data:", error);
        document.getElementById('root').innerHTML = '<div class="text-center p-10 text-red-600">Failed to load content. Please try again later.</div>';
    }
};

init();
