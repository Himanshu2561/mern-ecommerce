import { Country, State, City } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingForm = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [countryCode, setCountryCode] = useState(
    shippingAddress?.address || "AF"
  );
  const [country, setCountry] = useState(
    shippingAddress?.country || "--Country--"
  );
  const [state, setState] = useState(shippingAddress?.state || "--State--");
  const [city, setCity] = useState(shippingAddress?.city || "--City--");
  const [cities, setCities] = useState([]);

  const [address, SetAddress] = useState(shippingAddress?.address || "");
  const [zipCode, SetZipCode] = useState(shippingAddress?.zipCode || "");

  const changeCountry = (e) => {
    setCountryCode(e.target.value);
    setCountry(Country.getCountryByCode(e.target.value).name);
  };

  const changeStates = (e) => {
    setState(State.getStateByCodeAndCountry(e.target.value, countryCode).name);
    setCities(City.getCitiesOfState(countryCode, e.target.value));
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        country,
        state,
        city,
        address,
        zipCode,
      })
    );
    navigate("/payment");
  };

  return (
    <form onSubmit={submitHandler} className="col-span-2">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2">
          <label>
            <span className="text-red-500 pr-1">*</span>Country / region
          </label>
          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
            <select
              onChange={changeCountry}
              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              required={true}
            >
              <option value={country}>{country}</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label>
            <span className="text-red-500 pr-1">*</span>State / province
          </label>
          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
            <select
              onChange={changeStates}
              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              required={true}
            >
              <option value={state}>{state}</option>
              {State.getStatesOfCountry(countryCode).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label>
            <span className="text-red-500 pr-1">*</span>City
          </label>
          <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
            <select
              onChange={changeCity}
              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
              required={true}
            >
              <option value={city}>{city}</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-3">
          <label>
            <span className="text-red-500 pr-1">*</span>Address / Street
          </label>
          <input
            onChange={(e) => SetAddress(e.target.value)}
            required={true}
            type="text"
            name="address"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="Shipping Address"
            value={address}
          />
        </div>

        <div className="md:col-span-1">
          <label>
            <span className="text-red-500 pr-1">*</span>Zipcode
          </label>
          <input
            onChange={(e) => SetZipCode(e.target.value)}
            required={true}
            type="text"
            name="zipcode"
            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="123456"
            maxLength="6"
            value={zipCode}
          />
        </div>

        <div className="md:col-span-5 text-right mt-5">
          <div className="inline-flex items-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ShippingForm;
