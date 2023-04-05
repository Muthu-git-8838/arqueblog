// import { t } from "i18next";
// import React from "react";

// export default function Text({ children, element='p', className='', ...restProps}) {
//     const el = React.createElement(element)
//     const text = t(children)
//     return (
//         text.startsWith('<') && text.endsWith('>') ? <el.type {...restProps} className={`p-0 m-0 w-100 ${className}` } dangerouslySetInnerHTML={{ __html: text }} /> : <el.type {...restProps} className={`p-0 m-0 w-100 ${className}` }>{text}</el.type>
//     )
// }