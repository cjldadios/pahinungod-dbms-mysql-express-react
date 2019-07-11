import React from "react";
// import { render } from "react-dom";
import {
  Button,
  Container,
  //Divider,
  Header,
  //Icon,
  //Message,
  Modal
} from "semantic-ui-react";
// import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.setDate = this.setDate.bind(this);
    
    this.state = {
      date: new Date(),
      showModal: false,

      buttonLabel: this.props.buttonLabel,
    };
  }


  setDate(e) {
    console.log('Clicked Done.');

    var date = this.state.date;
    
    var dateString = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    this.props.setDate(dateString);
    this.closeModal(e);
  }

  handleChangeDate = (date) => {
    this.setState({
      date,
      // showModal: false
    });
  };

  closeModal = (e) => {
    console.log("closing modal: ", e);
    this.setState({
      showModal: false
    });
  };


  render() {
    return (
      // <div>
      //   <DatePicker
      //     selected={this.state.startDate}
      //     onChange={this.handleChange}
      //   />
      // </div>

      <Container>
        {/* <Divider hidden /> */}
        {/* <Header as="h1" floated="left">
          Date Picker Modal Bug Example
        </Header> */}

        {/* <Divider hidden clearing /> */}
        <Button basic onClick={() => this.setState({ showModal: true })}>
          {
            !this.state.buttonLabel ? (
              'Select Date'
            ) : ( this.state.buttonLabel)
          }
        </Button>
        <Modal
          open={this.state.showModal}
          onClose={this.closeModal}
        >
          {/* <Modal.Header>Date Picker Test</Modal.Header> */}
          <Modal.Content>
            <Modal.Description>
              <Header>Select Date</Header>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChangeDate}
              />

              <button onClick={this.setDate}>Done</button>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        {/* <Divider hidden clearing />
        <Message info>
          Click show modal button to replicate the issue. When you select the
          date from datepicker, it will also close the modal.
        </Message> */}
      </Container>
    );
  }
}

export default DateSelector;