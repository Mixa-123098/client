// import React from "react";

// const contactInfo = {
//   phone: "+38 (67) 769-7230",
//   email: "oda@gmail.com",
// };

// const socialMediaLinks = [
//   { name: "Facebook", url: "/" },
//   {
//     name: "Instagram",
//     url: "https://www.instagram.com/oda_archetecture/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr",
//   },
// ];

// const Footer = ({ settings }) => {
//   const { color, bgColor, shadow } = settings || {};

//   return (
//     <>
//       <div
//         style={{
//           boxShadow: ` 0 -1px 20px 1px rgba(0, 0, 0, 0.75)`,
//           width: `100%`,
//           // height: `25px`,
//           // marginTop:  `100px`
//         }}
//       ></div>
//       <footer
//         className={`py-3`}
//         style={{
//           backgroundColor: bgColor ? bgColor : "#6f6f6f",
//           color: color ? color : "white",
//         }}
//       >
//         <div className="container">
//           <div className="row justify-content-between">
//             <div className="col-md-4">
//               <h4>Контакти</h4>
//               <p>Телефон: {contactInfo.phone}</p>
//               <p>Email: {contactInfo.email}</p>
//             </div>
//             <div className="col-md-4">
//               <h4>Соціальні мережі</h4>
//               <ul className="list-unstyled">
//                 {socialMediaLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       className="text-decoration-none "
//                       style={{ color: color ? color : "white" }}
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-12">
//               <p className="text-center">
//                 <b> Всі права захищені &copy; {new Date().getFullYear()}</b>
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;

// import React from "react";

// const contactInfo = {
//   phone: "+123 456 7890",
//   email: "example@gmail.com",
//   viber: "+123 456 7890",
//   tg: "@example",
//   inst: "@example",
// };

// const socialMediaLinks = [
//   { name: "Вайбер", url: "viber://chat?number=+1234567890" },
//   {
//     name: "Instagram",
//     url: "https://www.instagram.com/oda_archetecture/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr",
//   },
//   {
//     name: "Телеграм",
//     url: "https://t.me/example",
//   },
// ];

// const Footer = ({ settings }) => {
//   const { color, bgColor } = settings || {};

//   return (
//     <div>
//       <div
//         style={{
//           boxShadow: ` 0 -1px 20px 1px rgba(0, 0, 0, 0.75)`,
//           width: `100%`,
//         }}
//       ></div>
//       <footer
//         className={`py-3`}
//         style={{
//           backgroundColor: bgColor ? bgColor : "#6f6f6f",
//           color: color ? color : "white",
//         }}
//       >
//         <div className="container d-flex flex-column">
//           <div className="row justify-content-between">
//             <div className="col-md-4">
//               <h4>Контакти</h4>
//               <p>Телефон: {contactInfo.phone}</p>
//               <p>Email: {contactInfo.email}</p>
//             </div>
//             <div className="col-md-4">
//               <h4>Соціальні мережі</h4>
//               <ul className="list-unstyled">
//                 {socialMediaLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.url}
//                       className="text-decoration-none "
//                       style={{ color: color ? color : "white" }}
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-12">
//               <p className="text-center">
//                 <b> Всі права захищені &copy; {new Date().getFullYear()}</b>
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
import React from "react";

const Footer = ({ settings }) => {
  const { color, bgColor } = settings || {};

  const contactInfo = {
    phone: "+123 456 7890",
    email: "example@gmail.com",
  };

  const socialMediaLinks = [
    { name: "Вайбер", url: "viber://chat?number=+1234567890" },
    {
      name: "Instagram",
      url: "https://www.instagram.com/oda_archetecture/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr",
    },
    { name: "Телеграм", url: "https://t.me/example" },
  ];

  const businessHours = [
    { day: "Понеділок - П’ятниця", hours: "9:00 - 18:00" },
    { day: "Субота", hours: "10:00 - 14:00" },
    { day: "Неділя", hours: "Закрито" },
  ];

  return (
    <div
      style={{
        boxShadow: `0 -1px 20px 1px rgba(0, 0, 0, 0.75)`,
        width: "100%",
      }}
    >
      {/* <div></div> */}
      <footer
        style={{
          backgroundColor: bgColor || "#5c5c5c",
          color: color || "white",
          padding: "30px 0",
        }}
      >
        <div className="container">
          <div className="row justify-content-between mb-4">
            <div className="col-md-4">
              <h4>Контакти</h4>
              <p>
                <b>Телефон:</b> {contactInfo.phone}
              </p>
              <p>
                <b>Email:</b> {contactInfo.email}
              </p>
            </div>
            <div className="col-md-4">
              <h4>Соціальні мережі</h4>
              <ul className="list-unstyled">
                {socialMediaLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{ color: color || "white" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Графік роботи</h4>
              <ul className="list-unstyled">
                {businessHours.map((item, index) => (
                  <li key={index}>
                    <span>{item.day}:</span> <b>{item.hours}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <h4>Ми на мапі</h4>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8301256359385!2d144.95373631532095!3d-37.816279979751704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5770fa5c4d041f6!2sFlinders%20St%20Station!5e0!3m2!1sen!2sua!4v1669850879474!5m2!1sen!2sua"
                width="100%"
                height="200"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; {new Date().getFullYear()} Всі права захищені</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
