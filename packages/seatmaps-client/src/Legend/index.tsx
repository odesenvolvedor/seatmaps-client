import React, { Component } from "react";
import Button from "../Button";
import Swatch from "./swatch";
import { IconChevronDown } from "../icons/ChevronDown";
import { IconChevronUp } from "../icons/ChevronUp";

const formatCurrency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}).format;

export interface Range {
  color: string;
  min: number;
  max: number;
}

export interface Props {
  ranges: Range[];
  isMobile?: boolean;
  showLegendOpenAlwaysForDesktop?: boolean;
  openLegendInitially?: boolean;
  legendLabel?: string;
  currency?: string;
  language?: string;
}

interface State {
  isOpen: boolean;
}

export default class Legend extends Component<Props, State> {
  static defaultProps = {
    isMobile: false,
    showLegendOpenAlwaysForDesktop: false,
    openLegendInitially: false,
  };

  state = {
    isOpen: this.props.openLegendInitially || false,
  };

  private formatPrice(value: number): string {
    return new Intl.NumberFormat(this.props.language, {
      style: 'currency',
      currency: this.props.currency || 'USD',
    }).format(value);
  }

  render() {
    const { isOpen } = this.state;
    const { ranges, isMobile, showLegendOpenAlwaysForDesktop } = this.props;

    return showLegendOpenAlwaysForDesktop && !isMobile ? (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            right: -2,
            border: "2px solid lightgray",
            borderRadius: "0 0 5px 5px",
          }}
        >
          <h3 style={{ padding: "0 0 0 8px", textAlign: "left" }}>
            {this.props.legendLabel || "Map Legend"}
          </h3>
          {ranges.map((range) => (
            <div key={range.color} style={{ padding: 8, textAlign: "left" }}>
              <Swatch color={range.color} style={{ marginRight: 8 }} />
              <span>
                {this.formatPrice(Math.floor(range.min))}
                {" - "}
                {this.formatPrice(Math.ceil(range.max))}
              </span>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div style={{ position: "relative" }}>
        <Button
          onClick={() => this.setState({ isOpen: !isOpen })}
          icon={isOpen ? <IconChevronUp /> : <IconChevronDown />}
          text={this.props.legendLabel || "Map Legend"}
          isMobile={isMobile}
        />
        {ranges.length > 0 && isOpen && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              right: -2,
              border: "2px solid lightgray",
              borderRadius: "0 0 5px 5px",
            }}
          >
            {ranges.map((range) => (
              <div key={range.color} style={{ padding: 8, textAlign: "left" }}>
                <Swatch color={range.color} style={{ marginRight: 8 }} />
                <span>
                  {this.formatPrice(Math.floor(range.min))}
                  {" - "}
                  {this.formatPrice(Math.ceil(range.max))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
