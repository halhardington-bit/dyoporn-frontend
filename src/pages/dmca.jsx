import "./Dmca.css";

export default function Dmca() {
  return (
    <div className="page page--legal">
      <div className="dmcaPage">
        <div className="dmcaHero">
          <div className="dmcaHeroBadge">LEGAL / COPYRIGHT</div>
          <h1 className="dmcaHeroTitle">DMCA Takedown Policy</h1>
          <p className="dmcaHeroText">
            We respect the intellectual property rights of others and respond to
            valid copyright complaints in accordance with applicable law.
          </p>

          <div className="dmcaHeroCard">
            <div className="dmcaHeroCardLabel">Designated contact</div>
            <div className="dmcaHeroCardEmail">dmca@dyop.ai</div>
            <div className="dmcaHeroCardSub">Use subject line: DMCA Takedown Notice</div>
          </div>
        </div>

        <div className="dmcaGrid">
          <section className="dmcaPanel dmcaPanelPrimary">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">01</span>
              <h2>How to submit a takedown notice</h2>
            </div>

            <p>
              If you believe content hosted on this site infringes your
              copyright, please send a written notice to our designated DMCA
              contact.
            </p>

            <div className="dmcaCallout">
              <div className="dmcaCalloutRow">
                <span className="dmcaCalloutLabel">Email</span>
                <span className="dmcaCalloutValue">dmca@dyop.ai</span>
              </div>
              <div className="dmcaCalloutRow">
                <span className="dmcaCalloutLabel">Subject</span>
                <span className="dmcaCalloutValue">DMCA Takedown Notice</span>
              </div>
            </div>
          </section>

          <section className="dmcaPanel">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">02</span>
              <h2>Include the following</h2>
            </div>

            <ul className="dmcaChecklist">
              <li>The copyrighted work you believe has been infringed.</li>
              <li>
                The exact URL or enough information for us to locate the
                allegedly infringing material.
              </li>
              <li>
                Your full name, mailing address, phone number, and email
                address.
              </li>
              <li>
                A good-faith statement that the use is not authorized by the
                copyright owner, its agent, or the law.
              </li>
              <li>
                A statement, under penalty of perjury, that the information is
                accurate and that you are authorized to act.
              </li>
              <li>Your physical or electronic signature.</li>
            </ul>
          </section>

          <section className="dmcaPanel">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">03</span>
              <h2>Suggested statement</h2>
            </div>

            <div className="dmcaQuote">
              <p>
                I have a good faith belief that the use of the copyrighted
                material described above is not authorized by the copyright
                owner, its agent, or the law.
              </p>
              <p>
                I swear, under penalty of perjury, that the information in this
                notice is accurate and that I am the copyright owner or am
                authorized to act on behalf of the owner of an exclusive right
                that is allegedly infringed.
              </p>
            </div>
          </section>

          <section className="dmcaPanel">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">04</span>
              <h2>What happens next</h2>
            </div>

            <p>
              Once we receive a substantially complete notice, we may review it
              and remove or disable access to the identified material. We may
              also notify the user who posted the content.
            </p>
          </section>

          <section className="dmcaPanel">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">05</span>
              <h2>Counter-notice</h2>
            </div>

            <p>
              If you believe content was removed or disabled by mistake or
              misidentification, you may submit a counter-notice. We will review
              it in accordance with applicable law.
            </p>
          </section>

          <section className="dmcaPanel dmcaPanelWarning">
            <div className="dmcaPanelHeader">
              <span className="dmcaStep">06</span>
              <h2>Important note</h2>
            </div>

            <p>
              Knowingly making material misrepresentations in a takedown notice
              or counter-notice may expose you to liability.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}