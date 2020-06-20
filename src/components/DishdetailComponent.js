import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row, Col, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);

      
    }



    handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));

    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

   render(){
     return(
       <div>
         <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>

         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                
                <Row className="form-group">
                 <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" name="rating" className="form-control" defaultValue="5">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text model=".name" id="name" name="name"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                       messages={{
                         required: 'Required* ',
                         minLength: 'Must be greater than 2 characters',
                         maxLength: 'Must be 15 characters or less'
                        }}
                    />
                   
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comment" md={2}>Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                           rows="6"
                           className="form-control"
                        />
                </Row>

                <Row className="form-group">
                  <Button type="submit" color="primary">Send Feedback </Button>
                </Row>

              </LocalForm>
            </ModalBody>
          </Modal>
       </div>


      
     );
   }

}
  
function RenderDish({dish}) {
  if(dish)
  {
    return (
      <Card>
         <CardImg width="100%" src={dish.image} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card> 
    )

  }

  else
  {
    return null;
  }
  
}
function RenderComments({comments}){
 if(comments){
  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-group">
        {comments.map((comments) => {
          return (
            <li key={comments.id} className="list-group mt-3">
              <p>{comments.comment}</p>
              <p>
                {"-- " +
                  comments.author +
                  " , " +
                  new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comments.date)))}
              </p>
            </li>
          );
        })}
        <CommentForm/>
      </ul>
    </div>
  );

 } 

 else
 {
   return null;
 }

}

const  DishDetail = (props) => {
  if(props.dish)
  {
    return(
      <div className="container">
        <div className="row">
            <Breadcrumb>
          
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
      </div>
    );
  }

  else
  {
    return null;
  }
  
}
export default DishDetail;