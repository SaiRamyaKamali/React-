import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row, Col, Form, FormGroup, Input, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)

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
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text model=".author" id="author" name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
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
                  <Button type="submit" color="primary">Submit</Button>
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
         <CardImg width="100%" src={baseUrl + dish.image} />
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
function RenderComments({comments, addComment, dishId}){
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
        <CommentForm dishId={dishId} addComment={addComment} />
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
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if(props.dish!=null)
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
                <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
               />
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