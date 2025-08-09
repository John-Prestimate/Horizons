import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51RU7vm2LLmSGSzUmgXz1EeCNVRydiGHZfTorIcsI2CKk2aLGNGxTerjGTmI5WjP4zUjHOh8XhUYnf4sSUdUhxBWZ00VX7MW2st');

export default stripePromise;