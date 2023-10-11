import {
  faPhone,
  faEnvelope,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="plant-footer">
      <div className="footer-bg py-8 flex flex-row text-white">
        <div className="footer-left-side w-4/12 p-10">
          <div className=" p-8 flex flex-col gap-4">
            <p>หน้าแรก</p>
            <p>สินค้าของเรา</p>
            <p>ติดต่อเรา</p>
            <p>นโยบายของเรา</p>
            <hr />
            <p>ช่องทางติดต่อ</p>
            <div className="flex flex-row gap-4">
              <FontAwesomeIcon icon={faPhone} />
              <p>0874069111</p>
            </div>
            <div className="flex flex-row gap-4">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>info@plantt.com</p>
            </div>
            <div className="flex flex-row gap-4">
              <FontAwesomeIcon icon={faMapPin} />
              <p>เลขที่ 35 ถนนพญาไท แขวงถนนพญาไท เขตราชเทวี กรุงเทพฯ 10400</p>
            </div>
          </div>
        </div>
        <div className="footer-right-side">
          <div>
            <iframe
              className=" rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3427653718177!2d100.53238131210398!3d13.75819149708694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29eca0a4dc2e7%3A0x944f80c1e57b451e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Lij4Lij4LiT4Liq4Lij4LiT4LmM!5e0!3m2!1sth!2sth!4v1696521158328!5m2!1sth!2sth"
              width="805"
              height="400"
              loading="lazy"
            ></iframe>
            <div className="flex justify-between items-center">
              <div className="ft-icon__box flex gap-4 py-4">
                <FontAwesomeIcon icon={faMapPin} />
                <FontAwesomeIcon icon={faMapPin} />
              </div>
              <div className="text-white">
                © 2023 Copyright PlantT. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
