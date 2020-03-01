import CMS from "netlify-cms-app"
import BlogPreview from "./BlogPreview"
import stylesheet from "./styles.css"
CMS.registerPreviewTemplate("blog", BlogPreview)
CMS.registerPreviewStyle(stylesheet)
