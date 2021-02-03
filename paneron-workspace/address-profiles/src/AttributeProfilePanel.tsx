import { AnchorButton, InputGroup, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressProfile, AttributeProfile } from "./AddressProfile";

export class AttributeProfilePanel extends React.Component<AttributeProfilePanelProps> {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <>
                <AttributeProfileForm />
                <AttributeProfileList 
                    items = {this.props.currentAddressProfile.attributeProfiles}
                />
            </>
        );
    }
}

class AttributeProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpeningForm: false,
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }

    render(){

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
        } as React.CSSProperties;

        const rightStyle = {
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;




        return(
            <div style={itemStyle}>
                <div style={{...itemHeadButtonStyle, ...rightStyle}}>
                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={} intent="success" icon="add" text="Confirm Create" />
                        :<></>
                    }
                </div>
                <div style={itemHeadButtonStyle}>
                    {this.state.isOpeningForm
                        ?<AnchorButton onClick={this.handleOpenForm} intent="danger" icon="delete" text="Discard Profile" />
                        :<AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Profile" />
                    }
                </div>
                {
                    this.state.isOpeningForm
                    ?<>
                        <hr style={itemHrStyle}/>
                        <div style={itemBodyStyle}>
                            <table>
                                <tr>
                                    <td>Max Cardinality</td>
                                    <td>:</td>
                                    <td>
                                        <NumericInput allowNumericCharactersOnly={true} value={this.state.maxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({maxCardinality: value})}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Min Cardinality</td>
                                    <td>:</td>
                                    <td>
                                        <NumericInput allowNumericCharactersOnly={true} value={this.state.minCardinality} onValueChange={(_v: number, value: string)=>{this.setState({minCardinality: value})}}/>   
                                    </td>
                                </tr>
                                <tr>
                                    <td>Value Type</td>
                                    <td>:</td>
                                    <td>
                                        <InputGroup value={this.state.valueType} onChange={(event)=>{this.setState({valueType: event.target.value})}}/>  
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </>
                    :<></>
                }
            </div>
        );
    }
}

class AttributeProfileList extends React.Component<AttributeProfileListProps> {
    render(){
        return(
            <>
                {this.props.items.map((item)=>(    
                    <AttributeProfileListItem
                        key={item.name}
                        item={item}
                    />
                ))}
            </>
        );
    }
}

class AttributeProfileListItem extends React.Component<AttributeProfileListItemProps> {
    constructor(props){
        super(props);
        this.state = {
            // Form state
            isEditingForm: false,
            // Profile Data
            name: this.props.item.name,
            maxCardinality: this.props.item.maxCardinality,
            minCardinality: this.props.item.minCardinality,
            valueType: this.props.item.valueType,

            dataBeforeEdit: {
                oldMaxCardinality: null,
                oldMinCardinality: null,
                oldValueType: null,
            }
        }
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                oldMaxCardinality: this.state.maxCardinality,
                oldMinCardinality: this.state.minCardinality,
                oldValueType: this.state.valueType,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDiscardChange = () => {
        this.setState({
            maxCardinality: this.state.dataBeforeEdit.oldMaxCardinality,
            minCardinality: this.state.dataBeforeEdit.oldMinCardinality,
            valueType: this.state.dataBeforeEdit.oldValueType,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    render(){

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        return(
            <div style={itemStyle}>
                <div style={itemHeadButtonStyle}>
                    {this.state.isEditingForm
                        ?
                        <>
                            <AnchorButton onClick={this.handleEditProfile} intent="success" icon="floppy-disk" text="Save Change" />
                            <AnchorButton onClick={this.handleDiscardChange} intent="danger" icon="cross" text="Discard Change" style={{marginLeft: "5px"}}/>
                        </>
                        :
                        <AnchorButton onClick={this.handleEditProfile} intent="success" icon="edit" text="Edit Profile" />
                    }
                </div>
                <div style={itemHeadStyle}>
                    {this.props.item.name}
                </div>
                <hr style={itemHrStyle}/>
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td>Max Cardinality</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <NumericInput allowNumericCharactersOnly={true} value={this.state.maxCardinality} onValueChange={(_v: number, value: string)=>{this.setState({maxCardinality: value})}}/>
                                    : <>{this.state.maxCardinality}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Min Cardinality</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <NumericInput allowNumericCharactersOnly={true} value={this.state.minCardinality} onValueChange={(_v: number, value: string)=>{this.setState({minCardinality: value})}}/>
                                    : <>{this.state.minCardinality}</>
                                }    
                            </td>
                        </tr>
                        <tr>
                            <td>Value Type</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                    ? <InputGroup value={this.state.valueType} onChange={(event)=>{this.setState({valueType: event.target.value})}}/>
                                    : <>{this.state.valueType}</>
                                }    
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export interface AttributeProfilePanelProps {
    currentAddressProfile: AddressProfile
}

interface AttributeProfileListProps {
    items: AttributeProfile[]
}

interface AttributeProfileListItemProps {
    item: AttributeProfile
}