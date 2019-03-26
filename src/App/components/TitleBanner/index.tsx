import * as React from "react";


export default class TitleBanner extends React.Component<{
    title: string
}> {


    public render(): React.ReactNode {
        return (
            <div className="title-banner">
                <h3>{this.props.title}</h3>
            </div>
        );
    }

}