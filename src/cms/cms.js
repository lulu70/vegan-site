import CMS from "netlify-cms-app"
import mdxImageWidget from "./mdxImageWidget"
import BlogPostPreview from "./BlogPostPreview"
CMS.registerEditorComponent(mdxImageWidget)
CMS.registerPreviewTemplate("blog", BlogPostPreview)
