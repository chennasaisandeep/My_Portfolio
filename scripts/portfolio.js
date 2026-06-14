window.portfolioData = {
    "site": {
        "title": "Saisandeep Chenna",
        "logo": "SS",
        "nav": [
            { "label": "Work", "id": "work" },
            { "label": "Experience", "id": "experience" },
            { "label": "Education", "id": "education" },
            { "label": "Skills", "id": "skills" },
            { "label": "Interests", "id": "hobbies" },
            { "label": "Contact", "id": "contact" }
        ],
        "socials": {
            "linkedin": "https://www.linkedin.com/in/sai-sandeep-chenna-628ab41a7",
            "github": "https://github.com/chennasaisandeep",
            "email": "mailto:saisandeephp@gmail.com"
        },
        "resume": "data/pdf/Saisandeep Chenna.pdf"
    },
    "hero": {
        "headline": "Machine Learning Engineer at HP.",
        "subheadline": "Architecting intelligent systems. I specialize in building scalable AI platforms, agentic workflows, and domain-specific LLM pipelines for complex engineering challenges.",
        "ctas": [
            { "label": "View Projects", "action": "work", "primary": true },
            { "label": "Resume", "action": "resume", "primary": false, "href": "data/pdf/Saisandeep Chenna.pdf" }
        ],
        "metrics": [
            { "label": "Months Experience", "value": (() => {
                const start = new Date(2025, 2, 1); // March 2025
                const now = new Date();
                const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                return `${Math.max(1, months)}+`;
            })() },
            { "label": "Projects Delivered", "value": "3" },
            { "label": "GPA (CMI)", "value": "9.22" }
        ]
    },
    "projects": [
        {
            "id": "proj_graphrag",
            "title": "GraphRAG Planning Platform",
            "role": "Machine Learning Engineer",
            "company": "HP",
            "year": "2025",
            "type": "AI Platform Development",
            "summary": "A retrieval-augmented planning system that turns natural-language feature requests into grounded, file-level implementation plans for large codebases.",
            "tags": ["GraphRAG", "Knowledge Graphs", "FastAPI", "Neo4j", "Qdrant", "VS Code"],
            "gradient": "from-purple-600 to-fuchsia-600",
            "links": { },
            "sections": {
                "overview": "An AI-assisted planning platform designed for complex software maintenance in a large codebase. Given a natural-language request and a target scope, it returns a prioritized set of files and optional implementation guidance.",
                "problem": "In large enterprise codebases, discovering the right files and sequencing changes is hard. Traditional search often produces low recall or low precision, leading to incomplete context and wasted time.",
                "solution": "Built a staged orchestration flow combining semantic retrieval, keyword retrieval, graph-based structural context, neural reranking, and staged LLM reasoning into a single pipeline.",
                "methodology": [
                    { "title": "Retrieval", "description": "Implemented a hybrid pipeline blending semantic and lexical search signals, fused using reciprocal rank fusion." },
                    { "title": "Reranking", "description": "Applied neural reranking plus graph-neighbor expansion for dependency-aware coverage." },
                    { "title": "Execution", "description": "Created durable queue mode with worker-based execution and restart resilience." }
                ],
                "features": [
                    "Scope-aware hybrid retrieval",
                    "Neural reranking with graph-neighbor expansion",
                    "Streaming progress model for interactive editor UX",
                    "Durable queue mode with worker execution"
                ],
                "results": [
                    { "label": "Candidate Reduction", "value": "~80%" },
                    { "label": "Pipeline", "value": "Deterministic" },
                    { "label": "Execution Mode", "value": "Durable" }
                ]
            }
        },
        {
            "id": "proj_slm",
            "title": "Domain-Specific SLM Training Pipeline",
            "role": "Machine Learning Engineer",
            "company": "HP",
            "year": "2025",
            "type": "AI / MLOps",
            "summary": "Built an end-to-end data and alignment pipeline to specialize a compact LLM for technical firmware assistance.",
            "tags": ["LLM", "Fine-Tuning", "SFT", "DPO", "Python", "Transformers"],
            "gradient": "from-blue-500 to-indigo-600",
            "links": { },
            "sections": {
                "overview": "This project is an end-to-end specialization pipeline for a compact language model focused on embedded firmware engineering documentation. The system turns heterogeneous technical sources into structured training corpora.",
                "problem": "General-purpose small language models are efficient but often underperform on specialized engineering domains. Training needed to run efficiently on finite GPU resources while preserving long-context signal.",
                "solution": "Developed a staged ML pipeline with clear handoffs: Data ingestion, Corpus refinement, Supervision dataset preparation, Model adaptation (CPT, SFT, DPO), Continuous behavior checks, and Export.",
                "methodology": [
                    { "title": "Data Processing", "description": "Built dataset preparation scripts mapping multi-stage QA sources into SFT, DPO, and ranked formats." },
                    { "title": "Model Adaptation", "description": "Implemented continual pre-training, supervised fine-tuning with assistant-token masking, and direct preference optimization." },
                    { "title": "Evaluation", "description": "Implemented callback-based qualitative evaluation to compare baseline and training checkpoints." }
                ],
                "features": [
                    "End-to-end training lifecycle from raw docs to deployable models",
                    "Long-context domain adaptation",
                    "Response-targeted supervision via assistant-masking",
                    "Periodic automated model-vs-baseline comparison"
                ],
                "results": [
                    { "label": "Corpus Refinement", "value": "100% Success" },
                    { "label": "Records Improved", "value": "74.5%" },
                    { "label": "Throughput", "value": "5.5 rec/s" }
                ]
            }
        },
        {
            "id": "proj_agentmesh",
            "title": "AgentMesh: Agentic Workflow Orchestrator",
            "role": "Machine Learning Engineer",
            "company": "HP",
            "year": "2026",
            "type": "Platform Development",
            "summary": "A graph-native platform for composing, executing, and observing AI-enabled workflows with real-time control loops.",
            "tags": ["React Flow", "Fastify", "Python", "Redis", "PostgreSQL", "TypeScript"],
            "gradient": "from-emerald-500 to-teal-600",
            "links": { },
            "sections": {
                "overview": "AgentMesh is a full-stack workflow orchestration system for building agentic pipelines as directed graphs instead of hardcoded scripts. It combines a visual canvas, an API control plane, and a Python execution engine.",
                "problem": "Teams often hit a scaling wall with AI workflows: execution semantics are unclear, operational visibility is weak, and reuse is expensive.",
                "solution": "Developed a graph-native runtime model. Workflows are validated before execution, tracked in durable run tables, and streamed to the frontend in real time.",
                "methodology": [
                    { "title": "Architecture", "description": "TypeScript services handle routing, persistence, and node-definition metadata, while Python handles runtime execution and graph semantics." },
                    { "title": "Execution", "description": "Implemented dependency tracking with ready-node scheduling and input-signature caching to avoid unnecessary recomputation." },
                    { "title": "Observability", "description": "Built real-time execution signaling from worker to frontend via Redis pub/sub and WebSocket relay." }
                ],
                "features": [
                    "Visual DAG authoring with rich node metadata",
                    "Pre-execution graph validation with cycle detection",
                    "Dependency-aware execution",
                    "Real-time execution telemetry"
                ],
                "results": [
                    { "label": "Graph Safety", "value": "Deterministic" },
                    { "label": "Redundancy", "value": "Reduced" },
                    { "label": "Observability", "value": "Real-time" }
                ]
            }
        },
        {
            "id": "proj_solar",
            "title": "Solar Power Anomaly Detection",
            "role": "Data Scientist Intern",
            "company": "Shree Cement Ltd.",
            "location": "Kolkata, West Bengal",
            "year": "May 2024 - Jul 2024",
            "type": "Industrial Internship",
            "summary": "A near real-time anomaly detection system for renewable energy assets, designed to reduce energy wastage and support the transition to green energy.",
            "tags": ["Python", "Power BI", "Streamlit", "Anomaly Detection", "Neural Networks", "EDA"],
            "gradient": "from-amber-500 to-orange-600",
            "links": {},
            "sections": {
                "overview": "At Shree Cement Ltd., I worked with the Data Science & Analytics department to address inefficiencies in solar power generation. The project focused on building a robust system to monitor renewable energy assets in real-time.",
                "problem": "Solar modules often suffer from performance dips due to dust, defects, or environmental factors. Identifying these specific underperforming units manually across vast solar farms is inefficient and leads to significant energy loss.",
                "solution": "I developed a data-driven anomaly detection pipeline. By leveraging historical and real-time sensor data, the system predicts expected power output and flags deviations. This allows the maintenance team to target specific modules for repair or cleaning.",
                "methodology": [
                    { "title": "Data Collection", "description": "Ingested real-time data from inverters and weather stations." },
                    { "title": "Preprocessing", "description": "Cleaned data and handled missing values using statistical imputation." },
                    { "title": "Modeling", "description": "Experimented with Isolation Forests and Autoencoders to learn 'normal' behavior patterns." },
                    { "title": "Deployment", "description": "Built a Streamlit interface for model interaction and integrated results into Microsoft Power BI for the operations team." }
                ],
                "features": [
                    "Real-time monitoring of power output",
                    "Automated alerts for performance deviations",
                    "Interactive Power BI Dashboard",
                    "Root cause analysis support"
                ],
                "results": [
                    { "label": "Energy Efficiency", "value": "Improved" },
                    { "label": "Detection Time", "value": "Real-time" },
                    { "label": "Assets Monitored", "value": "100%" }
                ]
            }
        },
        {
            "id": "proj_gan",
            "title": "Synthetic Data Evaluation Framework",
            "role": "Data Scientist Intern",
            "company": "Cloudcraftz AI",
            "year": "2023",
            "type": "Research & Implementation",
            "summary": "Designed a robust evaluation pipeline for GAN-generated tabular data using the 'TabSynDex' universal metric to quantify fidelity, utility, and privacy.",
            "tags": ["GANs", "TabSynDex", "Python", "Statistical Analysis", "Privacy Preserving"],
            "gradient": "from-purple-600 to-indigo-600",
            "links": {
                 "paper": "https://arxiv.org/pdf/2207.05295"
            },
            "sections": {
                "overview": "Synthetic data generation is critical for privacy-sensitive domains, but evaluating its quality is notoriously difficult. During my internship, I implemented a unified evaluation framework to benchmark various GAN architectures (CTGAN, WGAN-GP, TVAE) against real-world datasets.",
                "problem": "Traditional metrics like accuracy are insufficient for tabular data, which contains mixed data types (categorical/continuous) and complex dependencies. There was no single standard to measure how 'real' the synthetic data actually looked.",
                "solution": "I implemented \"TabSynDex\", a universal metric  that aggregates multiple quality dimensions into a single interpretable score (0-1). This allowed us to objectively rank generative models based on their ability to preserve data distribution and utility.",
                "methodology": [
                    { "title": "Basic Statistical Comparison", "description": "Computed the similarity of mean, median, and standard deviation between real and synthetic columns. Used the Kolmogorov-Smirnov (KS) test to detect distributional shifts." },
                    { "title": "Correlation Preservation", "description": "Calculated the difference between the Correlation Matrices of real and synthetic data (using Pearson for numerical and Theil's U for categorical) to ensure inter-column relationships were maintained." },
                    { "title": "Machine Learning Efficacy", "description": "Executed 'Train on Synthetic, Test on Real' (TSTR) experiments. We trained classifiers (Random Forest, XGBoost) on synthetic data and validated them on real hold-out sets to measure utility." },
                    { "title": "Privacy Assessment", "description": "Performed Distance to Closest Record (DCR) analysis to verify that the GANs were generating novel samples rather than memorizing the training data." }
                ],
                "features": [
                    "Unified TabSynDex Score (0-1) for easy benchmarking",
                    "Support for Mixed-Type Data (Numerical & Categorical)",
                    "Automated comparative reports for CTGAN vs WGAN",
                    "Privacy leakage detection via Distance Metrics"
                ],
                "results": [
                    { "label": "Evaluation Metric", "value": "TabSynDex" },
                    { "label": "Models Ranked", "value": "3+" },
                    { "label": "Outcome", "value": "Validated" }
                ]
            }
        }
    ],
    "experience": [
        {
            "id": 0,
            "company": "HP",
            "role": "Machine Learning Engineer",
            "location": "Bengaluru, Karnataka",
            "period": "Jun 2025 – Present",
            "summary": "Working as a Full-time Machine Learning Engineer.",
            "achievements": [
                "Developing scalable ML solutions.",
                "Leveraging Python, PyTorch, and cloud technologies.",
                "Collaborating with cross-functional teams to deploy models."
            ]
        },
        {
            "id": 0.5,
            "company": "HP",
            "role": "Machine Learning Engineer Intern",
            "location": "Chennai, Tamil Nadu (Remote)",
            "period": "Mar 2025 – May 2025",
            "summary": "Focused on enhancing web content extraction efficiency.",
            "achievements": [
                "Developed a comprehensive HTML readability system.",
                "Leveraged Python's readability module to extract clean main content.",
                "Optimized extraction for A4 print formatting."
            ]
        },
        {
            "id": 1,
            "company": "Shree Cement Ltd.",
            "role": "Data Scientist Intern",
            "location": "Kolkata",
            "period": "May 2024 – Jul 2024",
            "summary": "Improved solar power generation efficiency by creating a data-driven anomaly detection system.",
            "achievements": [
                "Explored Isolation Forest, Local Outlier Factor, DBSCAN.",
                "Developed a near real-time anomaly detection application.",
                "Integrated pipeline with Power BI."
            ]
        },
        {
            "id": 2,
            "company": "Cloudcraftz AI",
            "role": "Data Scientist Intern",
            "location": "Kolkata",
            "period": "May 2023 – Jul 2023",
            "summary": "Worked on evaluating large-scale tabular synthetic data generated by GAN models.",
            "achievements": [
                "Evaluated GAN model quality using statistical metrics.",
                "Optimized BodhiX web application by enabling multiprocessing."
            ]
        }
    ],
    "skills": {
        "Generative AI & Agents": [
            "LangGraph & LangChain",
            "Multi-Agent Systems",
            "GraphRAG",
            "LLM Fine-Tuning (SFT/DPO)",
            "Hugging Face",
            "Vector DBs"
        ],
        "Backend & Architecture": [
            "Python & TypeScript",
            "FastAPI & Fastify",
            "Redis & Message Queues",
            "PostgreSQL & Neo4j",
            "Docker",
            "Git"
        ],
        "Data Science & ML": [
            "PyTorch & TensorFlow",
            "Transformers",
            "Pandas & NumPy",
            "SQL",
            "Machine Learning",
            "Computer Vision"
        ],
        "Math & Foundations": [
            "Probability & Statistics",
            "Calculus",
            "Linear Algebra",
            "Algorithms",
            "Data Structures",
            "System Design"
        ]
    },
    "education": [
        {
            "school": "Chennai Mathematical Institute",
            "degree": "M.Sc. Data Science",
            "year": "Aug 2023 - Apr 2025",
            "grade": "GPA: 9.22",
            "icon": "fa-graduation-cap"
        },
        {
            "school": "Indian Statistical Institute",
            "degree": "B.Math (Hons.)",
            "year": "July 2019 - May 2022",
            "grade": "77% (First Div)",
            "icon": "fa-university"
        }
    ],
    "certificates": [
        {
            "name": "Google Data Analytics Professional",
            "issuer": "Google (Coursera)",
            "description": "Comprehensive program covering data fundamentals, preparation, processing, and analysis.",
            "icon": "fab fa-google",
            "link": "https://www.coursera.org/account/accomplishments/professional-cert/PJDUC7GM2YW7"
        },
        {
            "name": "Complete Data Science Bootcamp",
            "issuer": "Udemy",
            "description": "End-to-end data science training including classification, regression, clustering, and DL.",
            "icon": "fas fa-certificate",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-63128b89-958c-43ea-a363-92aa011fbcc2.jpg?v=1654781806000"
            ],
            "link": "https://www.udemy.com/certificate/UC-63128b89-958c-43ea-a363-92aa011fbcc2/"
        },
        {
            "name": "Tensorflow for Deep Learning Bootcamp",
            "issuer": "Udemy",
            "description": "Comprehensive TensorFlow 2 mastery covering Neural Networks, CNNs, RNNs, NLP, Computer Vision, Transfer Learning, and Time Series.",
            "icon": "fas fa-brain",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-e6b0542b-58a1-4ea7-8ef0-80f58ddb8ac1.jpg?v=1765541464000"
            ],
            "link": "https://www.udemy.com/certificate/UC-e6b0542b-58a1-4ea7-8ef0-80f58ddb8ac1/"
        },
        {
            "name": "Complete Python Pro Bootcamp",
            "issuer": "Udemy",
            "description": "Advanced Python programming concepts and best practices.",
            "icon": "fab fa-python",
            "images": [
                "https://udemy-certificate.s3.amazonaws.com/image/UC-fd0b1ffa-4d87-41b1-af4b-f750aa13dbe1.jpg"
            ],
            "link": "https://www.udemy.com/certificate/UC-fd0b1ffa-4d87-41b1-af4b-f750aa13dbe1/"
        }
    ],
    "hobbies": [
        {
            "name": "Photography & Editing",
            "description": "I love capturing moments and bringing them to life through creative editing.",
            "icon": "fa-camera",
            "imageFolder": "images/photography",
            "maxImages": 30
        },
        {
            "name": "CGI & VFX",
            "description": "Creating 3D graphics and visual effects using Blender 3D and After Effects.",
            "icon": "fa-cube",
            "imageFolder": "images/renders",
            "maxImages": 30
        },
        {
            "name": "Drawing",
            "description": "Passionate about anamorphic art and perspective manipulation.",
            "icon": "fa-paint-brush",
            "imageFolder": "images/drawings",
            "maxImages": 30
        },
        {
            "name": "Music",
            "description": "Music is my stress buster. I enjoy exploring different genres and discovering new artists.",
            "icon": "fa-music",
            "playlists": {
                "English": [
                    { "title": "Perfect", "artist": "Ed Sheeran", "link": "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
                    { "title": "Uptown Funk", "artist": "Mark Ronson ft. Bruno Mars", "link": "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
                    { "title": "Until I Found You", "artist": "Stephen Sanchez & Em Beihold", "link": "https://www.youtube.com/watch?v=hWCZP3MXdkE" },
                    { "title": "Shape of You", "artist": "Ed Sheeran", "link": "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
                    { "title": "Blinding Lights", "artist": "The Weeknd", "link": "https://www.youtube.com/watch?v=4NRXx6U8ABQ" }
                ],
                "Telugu": [
                    { "title": "Hukum", "artist": "Anirudh Ravichander", "link": "https://www.youtube.com/watch?v=u2CpHdkz-bs" },
                    { "title": "Samajavaragamana", "artist": "Sid Sriram", "link": "https://www.youtube.com/watch?v=VwjbJEdYT4s" },
                    { "title": "Naatu Naatu", "artist": "Rahul Sipligunj, Kaala Bhairava", "link": "https://www.youtube.com/watch?v=OsU0CGZoV8E" },
                    { "title": "Butta Bomma", "artist": "Armaan Malik", "link": "https://www.youtube.com/watch?v=q7P9AJi0P3E" },
                    { "title": "Oo Antava", "artist": "Indravathi Chauhan", "link": "https://www.youtube.com/watch?v=LB7D36n_xCw" }
                ],
                "Hindi": [
                    { "title": "Kesariya", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=bZIp90pC00E" },
                    { "title": "Apna Bana Le", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=BddP6PYo2gs" },
                    { "title": "Tum Hi Ho", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=Umqb9KENgmk" },
                    { "title": "Raabta", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=Hx4Df7JsHWI" },
                    { "title": "Channa Mereya", "artist": "Arijit Singh", "link": "https://www.youtube.com/watch?v=bzSTpdcs-EA" }
                ],
                "Others": [
                    { "title": "Telepatía", "artist": "Kali Uchis", "link": "https://www.youtube.com/watch?v=bn_p95HbHoQ" },
                    { "title": "Comment Allez-Vous?", "artist": "Leslie Clio", "link": "https://www.youtube.com/watch?v=tKhEnC9YSd4" },
                    { "title": "Despacito", "artist": "Luis Fonsi", "link": "https://www.youtube.com/watch?v=kJQP7kiw5Fk" },
                    { "title": "Con Altura", "artist": "ROSALÍA & J Balvin", "link": "https://www.youtube.com/watch?v=p7bfOZek9t4" }
                ]
            }
        },
        {
            "name": "Fast Typing",
            "description": "Achieved typing speed of 71 WPM to boost coding productivity.",
            "icon": "fa-keyboard"
        }
    ]
};
