import React from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import { transactions } from '../data/mockData';
import './AddCardPage.css';

const AddCardPage = () => (
  <div className="page add-card">
    <Header title="< ADD CARD" subtitle="Verify" searchPlaceholder="Search billing help">
      <div className="add-card__tabs">
        <button type="button" className="add-card__tab add-card__tab--active">
          Verify
        </button>
        <button type="button" className="add-card__tab" disabled>
          History
        </button>
      </div>
    </Header>
    <div className="add-card__body">
      <section className="add-card__form-card">
        <h2>Billing details</h2>
        <p className="add-card__hint">We are fully compliant with Payment Card Industry Data Security Standards.</p>
        <form className="add-card__form">
          <div className="add-card__grid">
            <FormInput label="Country">
              <select defaultValue="Japan">
                <option>Japan</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </FormInput>
            <FormInput label="State / Province">
              <input type="text" defaultValue="Tokyo" />
            </FormInput>
          </div>
          <FormInput label="Address">
            <input type="text" placeholder="Address" />
          </FormInput>
          <div className="add-card__grid">
            <FormInput label="City">
              <input type="text" defaultValue="Tokyo" />
            </FormInput>
            <FormInput label="ZIP / Postal code">
              <input type="text" placeholder="ZIP" />
            </FormInput>
          </div>
          <h3>Card details</h3>
          <FormInput label="Email">
            <input type="email" defaultValue="surafelteka43@gmail.com" />
          </FormInput>
          <FormInput label="Name on the card">
            <input type="text" placeholder="Name on the card" />
          </FormInput>
          <FormInput label="Card number" hint="We support Visa, Mastercard, Discover and JCB.">
            <div className="add-card__card-number">
              <input type="text" placeholder="0000 0000 0000 0000" />
              <button type="button" aria-label="scan card">📷</button>
            </div>
          </FormInput>
          <div className="add-card__grid">
            <FormInput label="Expiry">
              <input type="text" placeholder="MM / YY" />
            </FormInput>
            <FormInput label="CVC">
              <input type="text" placeholder="CVC" />
            </FormInput>
          </div>
          <label className="add-card__checkbox">
            <input type="checkbox" />Tick here to confirm that you are at least 18 years old and the age of majority in your
            place of residence.
          </label>
          <button type="button" className="add-card__submit">
            Submit
          </button>
        </form>
      </section>
      <aside className="add-card__aside">
        <div className="add-card__wallet">
          <h3>$0 Credits</h3>
          <p>Wallet credits</p>
          <div className="add-card__radio">
            <input type="radio" checked readOnly />
            <span>Add funds to your wallet</span>
          </div>
          <button type="button" className="add-card__wallet-button">
            Add a payment card
          </button>
          <label className="add-card__checkbox add-card__checkbox--disabled">
            <input type="checkbox" disabled />Make wallet primary method for rebills
          </label>
        </div>
        <div className="add-card__transactions">
          <h4>Latest transactions</h4>
          {transactions.length === 0 ? <p>No payments done yet.</p> : null}
        </div>
        <div className="add-card__logos" aria-label="Supported cards">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Discover</span>
          <span>JCB</span>
        </div>
        <div className="add-card__footer">
          <p>Fenix Internet LLC, 2300 West Sahara Ave Ste 800, Las Vegas, NV 89102</p>
        </div>
      </aside>
    </div>
  </div>
);

export default AddCardPage;
