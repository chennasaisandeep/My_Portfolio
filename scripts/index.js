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

const HobbyModal = ({ hobby, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [validGallery, setValidGallery] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(true);

    if (!hobby) return null;

    useEffect(() => {
        let mounted = true;
        let candidates = [];
        if (hobby.gallery) {
            candidates = hobby.gallery;
        } else if (hobby.imageFolder) {
            const format = hobby.imageFormat || 'jpg';
            const max = hobby.maxImages || 30;
            for(let i=1; i<=max; i++) {
                candidates.push(`${hobby.imageFolder}/${i}.${format}`);
            }
        }

        if (candidates.length > 0) {
            setLoadingGallery(true);
            const valid = [];
            let checked = 0;
            
            candidates.forEach((src, idx) => {
                const img = new Image();
                const checkDone = () => {
                    checked++;
                    if (checked === candidates.length && mounted) {
                        setValidGallery(valid.sort((a,b) => a.idx - b.idx).map(v => v.src));
                        setLoadingGallery(false);
                    }
                };
                img.onload = () => {
                    if (mounted) valid.push({ idx, src });
                    checkDone();
                };
                img.onerror = () => {
                    checkDone();
                };
                img.src = src;
            });
        } else {
            setLoadingGallery(false);
        }
        return () => { mounted = false; };
    }, [hobby]);

    const hasGallery = validGallery.length > 0;
    const hasCert = !!hobby.certificate;
    const hasPlaylists = hobby.playlists && Object.keys(hobby.playlists).length > 0;
    const isMedia = hasGallery || hasCert || (loadingGallery && (hobby.gallery || hobby.imageFolder));

    // Set first playlist as default
    React.useEffect(() => {
        if (hasPlaylists && !selectedPlaylist) {
            setSelectedPlaylist(Object.keys(hobby.playlists)[0]);
        }
    }, [hasPlaylists, selectedPlaylist, hobby]);

    // Prevent body scroll
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const nextImage = (e) => {
        e?.stopPropagation();
        if (hasGallery) setCurrentIndex((prev) => (prev + 1) % validGallery.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        if (hasGallery) setCurrentIndex((prev) => (prev - 1 + validGallery.length) % validGallery.length);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
            
            {/* Modal Container */}
            <div 
                className={`
                    rounded-2xl shadow-2xl relative flex flex-col overflow-hidden transition-all
                    ${hasPlaylists 
                        ? 'w-full max-w-2xl h-[80vh] md:h-[85vh] bg-[#0a0a0f] border border-white/[0.06]' 
                        : 'bg-white w-auto h-auto max-w-[95vw] max-h-[95vh] min-w-[320px] md:min-w-[500px]'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* Header */}
                <div className={`p-4 flex justify-between items-center flex-shrink-0 z-20 ${
                    hasPlaylists 
                        ? 'bg-white/[0.03] border-b border-white/[0.06] w-full' 
                        : `border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 ${isMedia ? 'w-0 min-w-full' : 'w-full'}`
                }`}>
                    <h3 className={`text-lg md:text-xl font-bold flex items-center gap-2 truncate pr-4 ${hasPlaylists ? 'text-white/80' : 'text-white'}`}>
                        <i className={`fas ${hobby.icon} ${hasPlaylists ? 'text-white/40' : ''}`}></i> <span className="truncate">{hobby.name}</span>
                    </h3>
                    
                    <button onClick={onClose} className={`${hasPlaylists ? 'text-white/30 hover:text-white/70' : 'text-white/80 hover:text-white'} transition-colors p-1 flex-shrink-0`}>
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Content Area */}
                <div className={`flex-1 min-h-0 flex flex-col relative ${isMedia ? 'bg-black' : 'bg-[#0F172A]'}`}>
                    
                    {isMedia ? (
                        <div className="relative flex items-center justify-center group bg-black overflow-hidden flex-1">
                            {loadingGallery ? (
                                <div className="text-white flex flex-col items-center justify-center h-full">
                                    <i className="fas fa-circle-notch fa-spin text-4xl mb-4 text-blue-500"></i>
                                    <p className="text-sm text-gray-400">Loading Images...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Blurred Background Projection */}
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-110 pointer-events-none"
                                        style={{ backgroundImage: `url('${hasGallery ? validGallery[currentIndex] : hobby.certificate}')` }}
                                    ></div>

                                    {/* Main Image */}
                                    <img 
                                        src={hasGallery ? validGallery[currentIndex] : hobby.certificate} 
                                        alt={hobby.name} 
                                        className="relative z-10 max-h-[60vh] md:max-h-[calc(85vh-12rem)] w-auto object-contain block mx-auto shadow-2xl"
                                        onError={(e) => {console.error('Image failed to load:', e.target.src); e.target.src='https://via.placeholder.com/800x600?text=Image+Not+Found'}}
                                    />
                                    
                                    {/* Navigation Arrows */}
                                    {hasGallery && validGallery.length > 1 && (
                                        <>
                                            <button onClick={prevImage} className="absolute z-20 left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                            <button onClick={nextImage} className="absolute z-20 right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                            <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-md border border-white/10 pointer-events-none">
                                                {currentIndex + 1} / {validGallery.length}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                    ) : hasPlaylists ? (
                        (() => {
                            // Genre-specific color palettes for a professional look
                            const genreColors = {
                                'English': { from: '#6366f1', to: '#8b5cf6', accent: 'rgb(139,92,246)', bg: 'rgba(99,102,241,0.15)', text: '#a5b4fc', pill: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' },
                                'Telugu': { from: '#f59e0b', to: '#ef4444', accent: 'rgb(245,158,11)', bg: 'rgba(245,158,11,0.15)', text: '#fcd34d', pill: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
                                'Hindi': { from: '#ec4899', to: '#f43f5e', accent: 'rgb(236,72,153)', bg: 'rgba(236,72,153,0.15)', text: '#f9a8d4', pill: 'bg-pink-500/20 text-pink-300 border-pink-400/30' },
                                'Others': { from: '#06b6d4', to: '#3b82f6', accent: 'rgb(6,182,212)', bg: 'rgba(6,182,212,0.15)', text: '#67e8f9', pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
                            };
                            const currentColors = genreColors[selectedPlaylist] || genreColors['English'];
                            const songs = selectedPlaylist ? hobby.playlists[selectedPlaylist] : [];
                            const totalSongs = songs.length;

                            return (
                                <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-[#0a0a0f]">
                                    
                                    {/* === HERO HEADER with gradient and equalizer === */}
                                    <div 
                                        className="relative px-6 pt-8 pb-6 flex-shrink-0 overflow-hidden"
                                        style={{ background: `linear-gradient(135deg, ${currentColors.from}22 0%, ${currentColors.to}15 50%, transparent 100%)` }}
                                    >
                                        {/* Decorative blur orbs */}
                                        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: currentColors.from }}></div>
                                        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 blur-2xl" style={{ background: currentColors.to }}></div>
                                        
                                        <div className="relative z-10 flex items-end gap-5">
                                            {/* Vinyl / Album Art Block */}
                                            <div className="hidden md:flex w-24 h-24 rounded-2xl items-center justify-center flex-shrink-0 relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(135deg, ${currentColors.from}, ${currentColors.to})` }}>
                                                {/* Subtle corner shine */}
                                                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/10 blur-md"></div>
                                                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-black/15 blur-sm"></div>
                                                <i className="fas fa-music text-white text-3xl relative z-10 drop-shadow-lg"></i>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Collection</span>
                                                    <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: currentColors.accent }}></span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight shimmer-text" style={{ backgroundImage: `linear-gradient(90deg, ${currentColors.from}, ${currentColors.to}, ${currentColors.from})` }}>
                                                    {selectedPlaylist || 'My Music'}
                                                </h3>
                                                <p className="text-white/30 text-xs mt-1.5 font-medium">{totalSongs} tracks • Curated Favorites</p>
                                            </div>
                                            
                                            {/* Animated Equalizer */}
                                            <div className="hidden sm:flex items-end gap-[3px] h-6 pr-1 flex-shrink-0">
                                                <span className="eq-bar eq-bar-1" style={{ background: currentColors.accent }}></span>
                                                <span className="eq-bar eq-bar-2" style={{ background: currentColors.accent }}></span>
                                                <span className="eq-bar eq-bar-3" style={{ background: currentColors.accent }}></span>
                                                <span className="eq-bar eq-bar-4" style={{ background: currentColors.accent }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* === GENRE TABS === */}
                                    <div className="px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0 border-b border-white/[0.04]">
                                        {Object.keys(hobby.playlists).map((playlistName) => {
                                            const isActive = selectedPlaylist === playlistName;
                                            const pillColors = genreColors[playlistName] || genreColors['English'];
                                            return (
                                                <button
                                                    key={playlistName}
                                                    onClick={() => setSelectedPlaylist(playlistName)}
                                                    className={`
                                                        px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                                                        ${isActive 
                                                            ? pillColors.pill + ' shadow-lg' 
                                                            : 'bg-transparent text-white/25 border-white/[0.06] hover:text-white/50 hover:border-white/10'
                                                        }
                                                    `}
                                                    style={isActive ? { boxShadow: `0 0 20px ${pillColors.from}15` } : {}}
                                                >
                                                    {playlistName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* === TRACK LIST HEADER === */}
                                    <div className="px-6 pt-3 pb-1 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white/20 flex-shrink-0">
                                        <span className="w-8 text-center">#</span>
                                        <span className="flex-1">Title</span>
                                        <span className="w-16 text-right hidden sm:block"><i className="fas fa-external-link-alt text-[8px]"></i></span>
                                    </div>
                                    
                                    {/* === TRACK ROWS === */}
                                    <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-hide">
                                        <div className="space-y-0.5">
                                            {songs.map((song, idx) => (
                                                <a 
                                                    key={idx} 
                                                    href={song.link || '#'} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="song-row group flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-white/[0.04] transition-all duration-200 relative"
                                                >
                                                    {/* Track Number / Play icon */}
                                                    <div className="w-8 flex items-center justify-center relative flex-shrink-0">
                                                        <span className="song-index text-sm font-medium text-white/20 tabular-nums">{idx + 1}</span>
                                                        <i className="song-play-icon fas fa-play text-white text-[10px] absolute"></i>
                                                    </div>
                                                    
                                                    {/* Mini album art square */}
                                                    <div 
                                                        className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow relative overflow-hidden"
                                                        style={{ background: `linear-gradient(135deg, ${currentColors.from}90, ${currentColors.to}90)` }}
                                                    >
                                                        <i className="fas fa-music text-white/60 text-xs"></i>
                                                        {/* Subtle inner ring */}
                                                        <div className="absolute inset-[3px] rounded border border-white/10"></div>
                                                    </div>
                                                    
                                                    {/* Song info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-semibold text-white/90 truncate group-hover:text-white transition-colors leading-tight">{song.title}</div>
                                                        <div className="text-[11px] text-white/30 truncate mt-0.5 group-hover:text-white/40 transition-colors">{song.artist}</div>
                                                    </div>
                                                    
                                                    {/* Link indicator */}
                                                    <div className="w-16 flex items-center justify-end flex-shrink-0 gap-3">
                                                        <i className="fab fa-youtube text-white/10 text-sm group-hover:text-red-400/60 transition-colors hidden sm:block"></i>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50">
                            <p>No preview available</p>
                        </div>
                    )}
                </div>
                
                {/* Footer Description */}
                <div className={`p-4 flex-shrink-0 z-20 ${
                    hasPlaylists 
                        ? 'bg-[#0a0a0f] border-t border-white/[0.04] w-full' 
                        : `bg-white border-t border-gray-100 ${isMedia ? 'w-0 min-w-full' : 'w-full'}`
                }`}>
                    <p className={`text-sm leading-relaxed break-words ${hasPlaylists ? 'text-white/30' : 'text-slate-600'}`}>{hobby.description}</p>
                    {hobby.link && (
                         <a href={hobby.link} target="_blank" className="mt-2 inline-flex items-center text-blue-600 font-bold hover:text-blue-700 text-sm hover:underline">
                            View External Credential <i className="fas fa-arrow-right ml-2 text-xs"></i>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectDetail = ({ project, onBack }) => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    
    const renderTechStack = (stack) => (
        <div className="flex flex-wrap gap-2 mt-3">
            {stack.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                    {tech}
                </span>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-white animate-fade-in font-sans scrollbar-hide">
            <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            `}</style>
            {/* Sticky Back Button */}
            <button 
                onClick={onBack} 
                className="fixed top-6 right-6 z-50 bg-white/90 hover:bg-white text-slate-900 px-5 py-3 rounded-full shadow-xl backdrop-blur-md transition-all flex items-center border border-slate-200 font-semibold group hover:scale-105"
            >
                <i className={`fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}></i> Back
            </button>

            {/* 1. Hero Section */}
            <div className={`relative w-full bg-gradient-to-br ${project.gradient} text-white pb-12 pt-24 px-6 md:px-12 shadow-lg`}>
                <div className="max-w-7xl mx-auto">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold mb-4 border border-white/10">
                        {project.type || "Case Study"}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">{project.title}</h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">{project.summary}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* 2. Sidebar (Sticky Metadata) */}
                    <aside className="lg:col-span-4 order-2 lg:order-1">
                        <div className="sticky top-4 space-y-8">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Project Details</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-500 font-medium">Role</div>
                                        <div className="text-gray-900 font-semibold">{project.role}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 font-medium">Timeline</div>
                                        <div className="text-gray-900 font-semibold">{project.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 font-medium">Company / Organization</div>
                                        <div className="text-gray-900 font-semibold">{project.company || "Personal Project"}</div>
                                    </div>
                                    {project.location && (
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">Location</div>
                                            <div className="text-gray-900 font-semibold">{project.location}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="text-sm text-gray-500 font-medium mb-2">Technologies</div>
                                    {renderTechStack(project.tags)}
                                </div>

                                {/* Action Links */}
                                <div className="mt-8 flex flex-col gap-3">
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all font-medium">
                                            <i className="fab fa-github mr-2"></i> View Code
                                        </a>
                                    )}
                                    {project.links.paper && (
                                        <a href={project.links.paper} target="_blank" className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
                                            <i className="fas fa-file-pdf mr-2"></i> Read Paper
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" className="flex items-center justify-center w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium">
                                            <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* 3. Main Content Area */}
                    <main className="lg:col-span-8 order-1 lg:order-2 space-y-12">
                        
                        {/* Context / Overview */}
                        {project.sections?.overview && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.gradient} text-white flex items-center justify-center mr-3 text-sm shadow-md`}>
                                        <i className="fas fa-info"></i>
                                    </span>
                                    Overview
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{project.sections.overview}</p>
                            </section>
                        )}

                        {/* Problem & Solution Grid */}
                        {(project.sections?.problem || project.sections?.solution) && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.sections.problem && (
                                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                        <h3 className="font-bold text-red-800 mb-2 flex items-center"><i className="fas fa-exclamation-circle mr-2"></i> The Challenge</h3>
                                        <p className="text-red-900/70 text-sm leading-relaxed">{project.sections.problem}</p>
                                    </div>
                                )}
                                {project.sections.solution && (
                                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                        <h3 className="font-bold text-green-800 mb-2 flex items-center"><i className="fas fa-check-circle mr-2"></i> The Solution</h3>
                                        <p className="text-green-900/70 text-sm leading-relaxed">{project.sections.solution}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Methodology (Timeline) */}
                        {project.sections?.methodology && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.gradient} text-white flex items-center justify-center mr-3 text-sm shadow-md`}>
                                        <i className="fas fa-cogs"></i>
                                    </span>
                                    Methodology & Approach
                                </h2>
                                
                                {Array.isArray(project.sections.methodology) ? (
                                    <div className="relative space-y-8">
                                        {/* The Vertical Line */}
                                        <div className="absolute left-[15px] top-2 bottom-0 w-0.5 bg-slate-200"></div>
                                        
                                        {project.sections.methodology.map((step, i) => (
                                            <div key={i} className="relative pl-12">
                                                {/* Number Dot */}
                                                <span className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${project.gradient} text-white font-bold text-sm shadow-md z-10`}>
                                                    {i + 1}
                                                </span>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                                                    <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="prose text-gray-600 leading-relaxed max-w-none whitespace-pre-line pl-4 border-l-4 border-slate-200">
                                        {project.sections.methodology}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Key Features List */}
                        {project.sections?.features && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {project.sections.features.map((feature, i) => (
                                        <li key={i} className="flex items-start p-3 rounded-lg border border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-white transition-colors">
                                            <i className={`fas fa-check-circle mt-1 mr-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}></i>
                                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Impact & Results Section */}
                        {project.sections?.results && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact & Results</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.sections.results.map((metric, i) => (
                                        <div key={i} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                                            <div className={`text-1xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} mb-2`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                    </main>
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
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        };
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
            {/* FORCE HIDE SCROLLBAR STYLES */}
            <style>{`
                /* Chrome, Safari and Opera */
                ::-webkit-scrollbar {
                    display: none;
                }
                /* IE, Edge and Firefox */
                html, body {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>

            {/* Modals */}
            {selectedHobby && <HobbyModal hobby={selectedHobby} onClose={() => setSelectedHobby(null)} />}
            {selectedCertificate && <HobbyModal hobby={{...selectedCertificate, gallery: selectedCertificate.images}} onClose={() => setSelectedCertificate(null)} />}

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    
                    {/* Logo */}
                    <div className="font-bold text-2xl tracking-tight pr-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                        {content.site.logo}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-6">
                        {content.site.nav.map(item => (
                            <button key={item.id} onClick={() => handleNav(item.id)} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">{item.label}</button>
                        ))}
                        <a href={content.site.socials.email} className="ml-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                            Let's Talk
                        </a>
                    </div>

                    <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-fade-in-up">
                        {content.site.nav.map(item => (
                            <button key={item.id} onClick={() => handleNav(item.id)} className="text-left text-lg font-medium py-2">{item.label}</button>
                        ))}
                    </div>
                )}

                <div 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                ></div>
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
                                <h3 className="relative text-white text-xl font-bold">{project.title}</h3>
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

            {/* Skills Section */}
            <Section id="skills" className="py-12 border-slate-200 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    {/* UPDATED: Changed 'mb-12' to 'mb-8' for consistent heading spacing */}
                    <h2 className="text-3xl font-bold mb-8 text-left">Technical Expertise</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {Object.entries(content.skills).map(([category, items], idx) => {
                            const icons = [ "fas fa-robot", "fas fa-brain", "fas fa-database", "fas fa-square-root-alt" ];
                            const colors = [ "text-purple-600 bg-purple-50", "text-blue-600 bg-blue-50", "text-emerald-600 bg-emerald-50", "text-orange-600 bg-orange-50" ];

                            return (
                                <div key={category} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                                    <div className="flex items-center mb-6">
                                        <div className={`w-10 h-10 rounded-lg ${colors[idx % 4]} flex items-center justify-center text-lg mr-4 group-hover:scale-110 transition-transform`}>
                                            <i className={icons[idx % 4]}></i>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{category}</h3>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-800 hover:text-white transition-colors cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                                    onClick={() => (hobby.gallery || hobby.imageFolder || hobby.certificate || hobby.playlists) && setSelectedHobby(hobby)}
                                    className={`bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex items-start gap-4 transition-all ${
                                        (hobby.gallery || hobby.imageFolder || hobby.certificate || hobby.playlists) ? 'hover:shadow-md cursor-pointer group' : ''
                                    }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <i className={`fas ${hobby.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            {hobby.name}
                                            {(hobby.gallery || hobby.imageFolder || hobby.certificate || hobby.playlists) && <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-blue-600 transition-colors"></i>}
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
            <Section id="contact" className="py-24 border-t border-slate-200 text-center">
                <h2 className="text-4xl font-bold mb-6">Let's work together.</h2>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                <div className="flex justify-center gap-4 mb-16">
                    <a href={content.site.socials.linkedin} target="_blank" className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-[#0077b5] hover:text-white flex items-center justify-center text-xl transition-all"><i className="fab fa-linkedin-in"></i></a>
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
