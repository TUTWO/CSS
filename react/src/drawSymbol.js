import React from 'react';
import commander from './command.js';

class DrawSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = { src: '' };
        this.drawSymbol = this.drawSymbol.bind(this);
    }

    drawSymbol(e) {
        this.state.src = e.target.src;
        commander.send({
            commandName: 'drawSymbol',
            image: e.target.src,
            labelStyle: e.style
        });
    }
    
    render() {
        let imgStyle = {
            cursor: 'pointer',
            border: '1px solid rgb(70,184,218)',
            margin: '0 0 0 30px'
        };
        return (
            <div onClick={this.drawSymbol}>
                <img title="Symbol" style={imgStyle} src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABgUExURf8lJb+/v1NTU4+Pj/8MDP8WFgcHB4CAgOXl5WtraykpKfX19Z+fn9HR0f+4uP9HR//x8f+xsf8/P/9PT//AwP+vr/9ycv+Ojv+fn/9gYP/r6//X1//e3gEBAf8AAP///6tc0DoAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEzSURBVDhPlZPtkoMwCEXTNmZb2zVqNOmHwPu/5QZIbevMTnbvHxHOBALEUEX/AfohemOt8XHoiytrBe5pxFVjuhf3CnQB0YbULUuXgkUMXQkU4GqwiZPaRFNs0FzVVuDaoJ/FKpo9NkoI0Bm8PYi+xaN63NBIFgbuAX2O0353ZhcRQCY8Bq6UgYSNnA/uoAQDNDeY8icD/YhR/A7aw5ENASjimPuRgQGt1u8A3J4LUWCyOAgQMfC/AEooQIFPzoCXXFkMgGsvTyChF8Bg6ZoAAO2lAB1ylMjiopGtFrR/A7Yp3H6T4rNIcKfjpsiPa4L7Om+v+d6ofIVsKLA26q3V0O7YUGBt9WtYII0uwGtY67jhJKNS4H3cz4W5lHVgfSxMfeXqS1tf+/rDyao8vd9UAYh+AGwaavVixIFNAAAAAElFTkSuQmCC" />
                <img title="Symbol" style={imgStyle} src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABgUExURenp6RcXF/+4uP9HR/8WFv8ODv/AwP9oaGpqav+Tk/+xsf8oKP/a2v8hIf8JCU5OTv+vr/8/P//x8f93d3p6ev+fn/9QUP/r65aWluzs7LKysv9OTv+IiAEBAf8AAP///1eKo30AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD+SURBVDhPlZPrkoMgDEYVUKqi9VK1rfrl/d+y3HS2rjuZPT8ixjMSICTE8B+hLwdZN00th7KPKcshzEWHg66YY/oQxARkyyqMEeuSAZOIH6IwVlA6D2OiXCtUYxgHYVSQrR9FWgkVDC+ICtr41wOjUflZnDBPkKfv1pCYXKVOKKC+/h9oFQr7sELfQYfcNxqd3Q8rlMiO+n+SZyi9MGCh1yN9vE6BFgxekFjpeUtuz1OgFdILNQTd3/S+nwIJ1F5oYChNKElPgQyaKGzb9luwySi4KS7Zp3BFXrIX6ZZ5yb5MdqPYrWYPiz9utmH4luOblm97/uJYmKv3F4xA9AGneWaf23bQpQAAAABJRU5ErkJggg==" />
                <img title="Symbol" style={imgStyle} src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADAUExURR8fH/39/fv7+////+/v7+vr6wcHBwUFBb6+vj8/Pzg4OM7Ozn9/fxAQEP7+/vPz83t7e2RkZJKSkomJifb29rOzswgICBMTE8rKyhsbGxcXFw8PDyYmJjU1NRQUFB4eHgsLCxoaGtHR0RYWFnJyckpKSt3d3QAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMj5SWcAAAApdFJOU/////////////////////////////////////////////////////8AUvQghwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAKFJREFUOE/tkUcSwkAMBB3BmZyDyav/vxDJO5RkOPAB92172qkc0B+GwNMPlmWVpTEOHhs0i3bkXF1McO4wQXgau47gBSOYYIrduWMIxWiQBpiZCo7RYIVR2MExGswwCmd9hgYPjMKhgbRByZ/4IYdjNIj0Je9bOEYDul2xuyeMYAKa+3tcighCsAEl+breb7Lez+gFRHFirxa+gl+GQCB6A/cRmcKxu3ogAAAAAElFTkSuQmCC" />
                <img title="Symbol" style={imgStyle} src="data:image/gif;base64,R0lGODlhIAAgANUtAP7+/kpKSnx8fJycnOvr6/n5+efn5x8fH1dXVwQEBCkpKbe3t6+vr2RkZO/v78fHx9vb2/f3939/f/39/Z+fnw4ODhYWFvv7+5mZmc7OzggICCMjI7Ozs+Pj4z8/P5KSkri4uDg4OKKioqysrIeHh76+vnBwcL+/v+bm5gcHBy8vLwAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAgACAAAAbOwJZwSCwaj8ikcskUAgrNqBAVCACky4mAZKAMsElIYMEqCwjgonbgKJcN1rRQTHa7vel1224/YwsHdXx2cFdSJieDg3hSFwERinx+UhkMkYRxUg0PlywRIA2GUQUIkIoLAQ9yJRKDDgMCF3ItLA0iIRUrFSoHELNDHwkrw8MVI78tHBbEzBYcswUbzNMbUGkY09kYch7Z0x5yGt7MGnII48QIcgzC4wkMcgAK6AqiYB0H3gcdyAQK7StSKECDrAWABxIQSMhgr6DDhxCPBAEAOw==" />
                <img title="Symbol With Label" style={imgStyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACk0lEQVRYR+2XT4hNURzHr3+Dhf8yZBrvDSXExkbElJSlspGNUCT/IiUL9SImyqTU3DcvY2GMzRQl7JBkYWFFSlFKioWoKQt/fz7f++6ZjuuNuec9z8q3Pt1zfud0f997zu/ed16UQ2NhPZyESxDDXmiDpms7HIZnYBm+wbsReAP3YRuMgbrUCkOgZHegCz6k/RAGQasYrD3g30hP3AfaBrX9sdewBlalrIVT8BU0rlUM0niogJ76MfjJtAqK3/ViYgdkdQg09irpBWoObIQBOA1vwU+ouijBy7T/CLKaBW7+FAVCpC2QJsBB0PL3wGdwNxW34Bx8hEngS303b7YCoToAE2Ec6AbdcB5ugG/iC+j1nAu+GjYwOb0eh6mwDlbAZVCRPQGXQIW5DHw1bGAmLK82oxnQUW1G82AzqD7OwHu4AFk1bKAI7dVmtBLmg2pCH6gWWATH4CxMh6waNuBLy6vX00mGllSbiala+qsGfOkN0QrsB99UVk0zoHqQRnu3m2Ygr/4bqM/A0kFrKZTtQbFsz7k+Lca2IR0KVX0GOsq2leTmoV/GelSfgUJs15SYpx9KDehLV4/CDXRUbFqa1FiJo66NmU3plBCFG2C/d7qkST9tQ38yIUzhBlj+20rI9XrSL9vVxEBsnzpL9qevXi2FGShetFb3xIUe61RsYcVWD8d6bUsyMb8CDcS2bzhZbANwhXa/i4FOuCEKNnDPS1aL74v7LORsl9/AgrIVXCKqP2bvdzkwdsKNMU9ngbzKb4AkR5IkFFsa+kUYeaFxrjfTUB7lN8B+P0wSxKbT72+iALsSg71mbd3mzoqjKawG2iums96ISsZLFvI3K8xAE6Sj2g+QgVpnxn+i3aD/FzUURT8ByB1xzq7G4G8AAAAASUVORK5CYII=" />
            </div>
        );
    }
}


export default DrawSymbol;