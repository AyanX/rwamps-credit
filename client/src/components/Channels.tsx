import s from "./Channels.module.scss";

const Channels = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={`reveal ${s.card}`}>
        <div className={s.textCol}>
          <div className={s.tag}>Digital Channels</div>
          <h2 className={s.title}>
            Finance in Your<br />Pocket, Always.
          </h2>
          <div className={s.underline} />
          <p className={s.desc}>
            Pioneers in Financial Inclusion, Now Driving Africa's Economic Growth. Musoni has been at the forefront of digital and cashless finance, ensuring accessible and efficient lending for entrepreneurs and businesses. Our track record in financial inclusion has now positioned us as a key enabler of venture financing for Africa's next wave of growth.
          </p>
        </div>

        <div className={s.imageCol}>
          <img
            src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Agricultural field with crops growing"
          />
          <div className={s.walletCard}>
            <div className={s.walletLabel}>Rwamps Wallet</div>
            <div className={s.walletAmount}>UGX 2.45M</div>
            <div className={s.walletSub}>Available Balance</div>
            <div className={s.walletActions}>
              {["Send", "Repay", "Apply"].map((a) => (
                <span key={a} className={s.walletAction}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Channels;
