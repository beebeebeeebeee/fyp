import { Tab, TabId, Tabs } from "@blueprintjs/core";
import * as React from "react";
import { Title } from "./Utility";

export class AddressProfileDiv extends React.Component {
    state = {
      tabBarTabId: "addressClass",
      currentAddressProfile: null
    }
  
    render() {
      const divStyle = {
        backgroundColor: "rgb(226, 226, 226)",
        height: "100%",
        width: "74.5%",
        border: "1px solid black",
        float: "right",
      } as React.CSSProperties;
  
      const textStyle = {
        fontSize: "16px",
        padding: "5px",
      } as React.CSSProperties;
  
      return (
        <div style={divStyle}>
          <Title name="Address Profile" />
          <Tabs
            id="TabsExample"
            animate={true}
            onChange={this.handleTabChange}
            selectedTabId={this.state.tabBarTabId}
          >
            <Tab id="addressClass" title="Address Class Profiles" panel={<div style={textStyle}>1</div>} />
            <Tab id="addressComponent" title="Address Component Profiles" panel={<div style={textStyle}>2</div>} />
            <Tab id="attribute" title="Attribute Profiles" panel={<div style={textStyle}>3</div>} />
            <Tabs.Expander />
          </Tabs>
        </div>
      );
  
    }
  
    private handleTabChange = (tabId: TabId) => {
      this.setState({ tabbarTabId: tabId });
      console.log("tabId: " + tabId);
    }
  }