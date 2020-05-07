/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
import React, {useState, useEffect} from 'react';
import {Link , NavLink} from 'react-router-dom';
import Model from '../modal';
import {When} from '../if';
import { connect } from 'react-redux';
import { getAllRecipients, addDonor, deleteDonor, updateDonor } from '../../action/index.js';


import './donor.scss';
import '../../../node_modules/aos/dist/aos.css';
import desserts0 from '../../assets/desserts-0.jpg';
import desserts1 from '../../assets/desserts-1.jpg';
import desserts2 from '../../assets/desserts-2.jpg';


import easternfood0 from '../../assets/eastern-food-0.jpg';
import easternfood1 from '../../assets/eastern-food-1.jpg';
import easternfood2 from '../../assets/eastern-food-2.jpg';


import fastfood0 from '../../assets/fast-food-0.jpg';
import fastfood1 from '../../assets/fast-food-1.jpg';
import fastfood2 from '../../assets/fast-food-2.jpg';
import fastfood3 from '../../assets/fast-food-3.jpg';
import Recipients from '../resipient/resipient';
import fastfood4 from '../../assets/fast-food-4.jpg';
import fastfood5 from '../../assets/fast-food-5.jpg';

import AOS from 'aos';

const easternfoodArray = [easternfood0, easternfood1, easternfood2];
const fastfoodArray = [fastfood0, fastfood1, fastfood2 ,fastfood4,fastfood5];
const dessertsArray = [desserts0, desserts1, desserts2];



const donorsAPI = `${process.env.REACT_APP_API}/api/v1/donor`;

function Donors (props){
  AOS.init();

  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [updated, setUpdate] = useState({});
  const [ num, setNum] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [numberOfCart, setNumberOfCart] = useState(0);

  const handelInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value});
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();
    props.addDonor(item);
    setNum(Math.floor(Math.random() * 4));
    setShowForm(false);
    setShowPost(true);
  };

  const deleteItem = id =>{
    props.deleteDonor(id);
    setShowPost(false);
  };


  const handelUpdateChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const updateItem = e =>{
    e.preventDefault();
    props.updateDonor(updated._id, updated);
    setShowUpdate(!showUpdate);
  };

  useEffect(() => {
    props.getAllRecipients();
  }, []);

  const toggleDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleUpdate = updatedItem => {
    setUpdate(updatedItem);
    setShowUpdate(!showUpdate);
  };

  const handelUpdateCartChange = e => {
    setUpdate({...updated, [e.target.name]: e.target.value});
  };

  const toggleCartDetails = item => {
    setDetails(item);
    setShowDetails(!showDetails);
  };

  const toggleCartUpdate = item => {
    setUpdate(item);
    setShowUpdate(!showUpdate);
  };

  const deleteCartItem = id => {
    let newCartList = cartList.filter( item => item._id !== id );
    setCartList(newCartList);
    setNumberOfCart(numberOfCart - 1);
  };

  const UpdteCartItem = e =>{
    e.preventDefault();
    setCartList(cartList.map(item => item._id === updated._id ? updated : item));
    setShowUpdate(!showUpdate);
  };
  const toggleCart = () => setShowCart(!showCart);

  const addCart = donor => {
    for (let i = 0; i < cartList.length; i++) {
      if(donor._id === cartList[i]._id) return;
    }
    setCartList([...cartList, donor]);
    setNumberOfCart(numberOfCart + 1);
  };
  const toggleForm = e => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  return (
    <>
      <section className="block-donor">
        <div className="donation-div">
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" className="donor-header">Donors</h3>
          <span className="space-span"></span>
          <p data-aos="fade-left" data-aos-duration="1000" className="donation-p">“Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness”</p>
          <p data-aos="fade-right" data-aos-duration="1000" className="donation-p">“Love is not patronizing and charity isn't about pity, it is about love. Charity and love are the same -- with charity you give love, so don't just give money but reach out your hand instead”</p>
          {/* <img src={cartPhoto} onClick={toggleCart}  height="100" width="200"/> */}
          <div className="donation-href-div">
            <div className="cart-div" data-aos="fade-right"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine">
              {/* <header className="cart-count">{numberOfCart}</header> */}
              <i className="fa fa-cart-plus curt-item" aria-hidden="true" onClick={toggleCart} > <header className="cart-count">{numberOfCart}</header></i></div>
            {!showForm && (
              <button  data-aos="zoom-in-up" data-aos-duration="1000" onClick={toggleForm} className="donation-button"> Let's Donate !</button>)}
          </div>
          {showForm && (
            <Model title='Donor Form' close={toggleForm}>
              <div className="addMeal-div">
                <div className="addMeal-form" >
                  <form onSubmit={addItem} className="add-form">
                    <label className="form-lable-"> Name:</label>
                    <input type='text' name='name' placeholder='type your name' className="form-input-" onChange={handelInputChange} required />
                    <label className="form-lable-"> Food Type:</label>

                    <div className="form-lable-r">
                      <label>
                        <input type='radio' name='type' value='eastern food'   onClick={handelInputChange} required />Eastern Food
                      </label>
                      <label>
                        <input type='radio' name='type' value='fast food'   onClick={handelInputChange} required />Fast Food
                      </label>
                      <label>
                        <input type='radio' name='type' value='desserts' onClick={handelInputChange} required />Desserts
                      </label>
                    </div>

                    <label className="form-lable-">Amount:</label>
                    <input type='text' name='amount'  className="form-input-" placeholder='type your amount' onChange={handelInputChange} />
                    <label className="form-lable-"> Avalible Time:</label>
                    <input type='time' name='available_time'  className="form-input- time" placeholder='type your available_time' onChange={handelInputChange} required />
                    <button className="form-button-">Submit</button>
                  </form>
                </div>
              </div>
            </Model>
          )}
        </div>

        {showPost && (
          <div  className="donor-line-section div-aos" data-aos="zoom-in-up" data-aos-duration="2000" >
            <div className="donor-item section-item">
              <img src={props.newDonorItem.type === 'eastern food' ? easternfoodArray[num] : props.newDonorItem.type === 'fast food' ? fastfoodArray[num] : dessertsArray[num]} className="section-donor-item-img" height="330px" width="300px" />
              <div className="section-info">
                <div className="section-donor-name">{props.newDonorItem.name}</div>
                <div className="section-donor-type">{props.newDonorItem.type}</div>
                <div className="section-donor-time">{props.newDonorItem.available_time}</div>
                <div className="section-donor-amount">{props.newDonorItem.amount}</div>
              </div>
              <div className="section-button">
                <button onClick={()=> toggleUpdate(props.newDonorItem)} className="donor-item-button-section"> <i className="		fa fa-pencil-square info"></i>Update</button>
                <button onClick={()=> deleteItem(props.newDonorItem._id)} className="donor-item-button-section"><i className="fa fa-close info"></i> DELETE</button>
              </div>
            </div>
          </div>
        )}

      </section>
      <h4 data-aos="zoom-in-up" data-aos-duration="1500" className="recipient-header"> Recipients Requests</h4>
      <section className="block-recipient">
        <div className="recipient-list">
          {props.recipients.results && props.recipients.results.map((recipient, idx) =>{
            let src = recipient.requestType === 'eastern food' ? easternfoodArray[num] : recipient.requestType === 'fast food' ? fastfoodArray[num] : dessertsArray[num];
            return <div key={idx} className="donor-line div-aos" data-aos="zoom-in-up" data-aos-duration="2000">
              <div className="donor-item">
                <div className="styles-div">
                  <img src={src} className="donor-item-img" height="330" width="300" />
                  <div className="donor-item-div1" data-aos="fade-right"
                    data-aos-duration="1500" ></div>
                  <div className="donor-item-div2"data-aos="fade-left"
                    data-aos-duration="1700"></div>
                </div>
                <div className="donor-item-name">
                  {recipient.name}
                </div>
              </div>
              <div className="div-buttons">
                <button onClick={()=> toggleDetails(recipient)} className="donor-item-button"> <i className="	fa fa-address-card-o info"></i>More Detail</button>
                <button onClick={()=> addCart(recipient)} className="donor-item-button"> <i className="fa fa-cart-plus cart" ></i>Add To Cart</button>
              </div>
            </div>;
          })}
        </div>
        <div className='pop-up-sub-model'>
          <When condition={showDetails}>
            <Model title='Recipient Details' close={toggleDetails}>
              <div className="recipient-details">
                <div className="detail-info">
                  <div className="detail-name"><span>Name:</span> <p>{details.name}</p></div>
                  <div className="detail-type"><span>Request Type:</span> <p>{details.requestType}</p> </div>
                  <div className="detail-identity"><span>Identity:</span> <p>{details.identity}</p></div>
                  <div ><i className="fa fa-phone"></i><p>{details.contactNumber}</p></div>
                  <div className="item">
            Description: {details.description}
                  </div>
                </div>
              </div>
            </Model>
          </When>
        </div>
        <div className='pop-up-sub-model'>
          <When condition={showUpdate}>
            <Model title='Recipient Update' close={toggleUpdate}>
              <div className="recipient-updated">
                <form onSubmit={updateItem} value={updated} className="update-form">
                  <label className="update-label">
                    <input type='hidden' v name='_id' value={details._id} className="update-input" />
                  </label>
                  <label className="update-label"> <span> Name:</span>
                    <input type='text' name='name' placeholder='type your name' className="update-input" defaultValue={updated.name} onChange={handelUpdateChange} required />
                  </label>
                  <div className="redio-div">
                    <label className="update-label-r">
                      <input type='radio' name='type' value='eastern food' className="update-input-r" defaultValue={updated.requestType}  onClick={handelUpdateChange} required />Eastern Food
                    </label>
                    <label className="update-label-r">
                      <input type='radio' name='type' value='fast food' className="update-input-r"  defaultValue={updated.requestType}  onClick={handelUpdateChange} required />Fast Food
                    </label>
                    <label className="update-label-r">
                      <input type='radio' name='type' value='desserts' className="update-input-r"  defaultValue={updated.requestType}  onClick={handelUpdateChange} required /> Desserts
                    </label>
                  </div>
                  <label className="update-label"> <span> Available Time:</span>
                    <input type='text' name='available_time' placeholder='type your available_time' className="update-input" defaultValue={updated.available_time} onChange={handelUpdateChange} required />
                  </label>
                  <label className="update-label"><span> Amount: </span>
                    <input type='number' name='amount' placeholder='type your amount' className="update-input" defaultValue={updated.amount} onChange={handelUpdateChange} />
                  </label>
                  <button className="update-button" >Submit</button>
                </form>
              </div>
            </Model>
          </When>
        </div>
        <When condition={showCart}>
          <Model title='Cart List' close={toggleCart}>

            {
              cartList.map((item, i)=>{
                return <div key={i}>
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-button-div">
                    <button onClick={()=> toggleCartDetails(item)} className="update-button-cart"><i className="fa fa-address-card-o info"></i>More Detail</button>
                    <button onClick={()=> toggleCartUpdate(item)} className="update-button-cart"><i className="fa fa-pencil-square info"></i>Update</button>
                    <button onClick={()=> deleteCartItem(item._id)} className="update-button-cart"><i className="fa fa-close info"></i>DELETE</button>
                  </div>
                </div>;
              })
            }
          </Model>
        </When>
        <div className="spasee-div"></div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  recipients: state.reducer.recipientItems,
  newDonorItem: state.reducer.newDonorItem,
});
const mapDispatchToProps = { getAllRecipients, addDonor, deleteDonor, updateDonor };

export default connect(mapStateToProps, mapDispatchToProps)(Donors);