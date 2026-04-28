const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');
const Publication = require('../models/Publication');
const Project = require('../models/Project');

exports.createPublication = async (req, res) => {
    try {
        const { title, description, content, authors, publishedDate, publisher, team, project, activeFilds, tags } = req.body;
        
        let documentUrl = '';
        if (req.file) {
            documentUrl = `/uploads/publications/${req.file.filename}`;
        } else {
            const pdfName = `pub-${Date.now()}.pdf`;
            const pdfPath = path.join(__dirname, '../../uploads/publications', pdfName);
            
            const dir = path.dirname(pdfPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            // Prepare professional HTML template
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 40px; }
                        h1 { color: #000; font-size: 24pt; text-align: center; margin-bottom: 10px; }
                        .authors { text-align: center; color: #666; font-size: 12pt; margin-bottom: 30px; }
                        .content { text-align: justify; }
                        img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #f8f9fa; }
                        blockquote { border-left: 5px solid #3457dc; padding-left: 20px; font-style: italic; color: #555; }
                        hr { border: 0; border-top: 1px solid #eee; margin: 30px 0; }
                    </style>
                </head>
                <body>
                    ${content || '<p>No content provided</p>'}
                </body>
                </html>
            `;

            const options = { format: 'A4', margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' } };
            const file = { content: htmlContent };

            // Generate PDF buffer
            const pdfBuffer = await html_to_pdf.generatePdf(file, options);
            fs.writeFileSync(pdfPath, pdfBuffer);
            
            documentUrl = `/uploads/publications/${pdfName}`;
        }

        const authorList = Array.isArray(authors) ? authors : authors ? authors.split(',').map(a => a.trim()) : [];
        const fieldList = Array.isArray(activeFilds) ? activeFilds : activeFilds ? activeFilds.split(',').map(f => f.trim()) : [];
        const tagList = Array.isArray(tags) ? tags : tags ? tags.split(',').map(t => t.trim()) : [];
        
        let teamId = team || (req.user ? req.user.team : null);
        if (!teamId && project) {
            const associatedProject = await Project.findById(project);
            if (associatedProject) teamId = associatedProject.team;
        }
        
        const publication = await Publication.create({
            title,
            description,
            content,
            authors: authorList,
            publishedDate: publishedDate || Date.now(),
            publisher: publisher || 'Institutional Research Lab',
            team: teamId,
            project: project || null,
            activeFilds: fieldList,
            tags: tagList,
            documentUrl
        });

        res.status(201).json(publication);
    } catch (error) {
        console.error("Publication error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getPublications = async (req, res) => {
    try {
        const query = {};
        if (req.query.team) query.team = req.query.team;
        if (req.query.project) query.project = req.query.project;
        
        // Default to Approved for public view, unless status is explicitly requested (e.g. from dashboard)
        if (req.query.status) {
            if (req.query.status !== 'all') query.status = req.query.status;
        } else {
            query.status = 'Approved';
        }
        
        const publications = await Publication.find(query)
            .populate('team', 'name focus activeFilds')
            .populate('project', 'title status')
            .sort({ publishedDate: -1 });
            
        res.json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) return res.status(404).json({ message: 'Publication not found' });
        
        await publication.deleteOne();
        res.json({ message: 'Publication removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePublicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!publication) return res.status(404).json({ message: 'Publication not found' });
        res.json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.incrementViews = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!publication) return res.status(404).json({ message: 'Publication not found' });
        res.json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
