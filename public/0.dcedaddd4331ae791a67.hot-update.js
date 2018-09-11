webpackHotUpdate(0,{2918:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=w(a(38)),r=w(a(9)),n=w(a(21)),u=w(a(8)),d=w(a(10)),c=a(0),o=w(c),i=w(a(2)),s=w(a(2919)),f=w(a(2921)),m=w(a(2923)),p=w(a(2925)),g=w(a(2927)),b=w(a(119)),h=w(a(34)),E=a(128),v=w(a(52)),y=a(26),O=a(28),C=a(25),Q=w(a(2765)),S=a(32);function w(e){return e&&e.__esModule?e:{default:e}}var P=function(){return o.default.createElement(h.default,{container:!0,justify:"center",alignItems:"center",direction:"column"},o.default.createElement(h.default,{item:!0,lg:12},o.default.createElement("h2",null,"Your order has been successfully sent")),o.default.createElement(h.default,{item:!0,lg:12,justif:"center"},o.default.createElement(v.default,{variant:"outlined",size:"small",component:E.Link,to:"/"},"Continue Shopping")))},N=function(e){function t(){var e,a,n,d;(0,r.default)(this,t);for(var c=arguments.length,o=Array(c),i=0;i<c;i++)o[i]=arguments[i];return a=n=(0,u.default)(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),Object.defineProperty(n,"handleChange",{enumerable:!0,writable:!0,value:function(e){return function(t){t.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)&&n.setState({error:!1}),n.setState((0,l.default)({},e,t.target.value)),console.log(n.state.error)}}}),Object.defineProperty(n,"deleteProduct",{enumerable:!0,writable:!0,value:function(e){n.props.deleteProductFromOrder(e)}}),Object.defineProperty(n,"addQuantity",{enumerable:!0,writable:!0,value:function(e){n.props.addQt(e)}}),Object.defineProperty(n,"discardQuantity",{enumerable:!0,writable:!0,value:function(e){n.props.discardQt(e)}}),Object.defineProperty(n,"SendOrder",{enumerable:!0,writable:!0,value:function(e){var t={total:n.props.total,products:n.props.products,contact:n.state.email};Q.default.post("/orders",{order:t}).then(function(e){return n.setState({successful:e.data})}),n.props.deleteOrder(),localStorage.removeItem("order"),localStorage.removeItem("total")}}),Object.defineProperty(n,"SaveOrder",{enumerable:!0,writable:!0,value:function(){var e=n.props.products,t=n.props.total;localStorage.setItem("order",JSON.stringify(e)),localStorage.setItem("total",t)}}),Object.defineProperty(n,"state",{enumerable:!0,writable:!0,value:{successful:null,error:!1}}),d=a,(0,u.default)(n,d)}return(0,d.default)(t,e),(0,n.default)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,l=t.products,r=t.total;return this.state.successful?o.default.createElement(P,null):o.default.createElement(h.default,{container:!0,justify:"center",className:a.root},o.default.createElement(h.default,{item:!0,lg:12,className:a.center,component:"h2"},"Orders"),o.default.createElement(h.default,{item:!0,xs:12,sm:12,md:12,lg:12},o.default.createElement(b.default,{id:"email",label:"email",error:this.state.error,fullWidth:!0,type:"email",className:a.textField,value:this.state.email,onChange:this.handleChange("email"),margin:"normal"})),o.default.createElement(h.default,{item:!0,xs:12,sm:12,md:12,lg:12},o.default.createElement(s.default,{className:a.table},o.default.createElement(p.default,null,o.default.createElement(g.default,null,o.default.createElement(m.default,null,"Name"),o.default.createElement(m.default,{numeric:!0},"Price"),o.default.createElement(m.default,{numeric:!0},"Qt"),o.default.createElement(m.default,{numeric:!0}))),o.default.createElement(f.default,null,l.map(function(t){return o.default.createElement(g.default,{key:t.id},o.default.createElement(m.default,{component:"th",scope:"row"},t.name),o.default.createElement(m.default,{numeric:!0},"$",t.price),o.default.createElement(m.default,{numeric:!0},o.default.createElement(v.default,{className:a.buttonQt,size:"small",onClick:function(){return e.discardQuantity(t.id)}},"-"),o.default.createElement("span",{className:a.labelQt},t.qt),o.default.createElement(v.default,{className:a.buttonQt,size:"small",onClick:function(){return e.addQuantity(t.id)}},"+")),o.default.createElement(m.default,null,o.default.createElement(v.default,{color:"secondary",onClick:function(){return e.deleteProduct(t.id)}},"Delete")))}),o.default.createElement(g.default,null,o.default.createElement(m.default,{numeric:!0,colSpan:2,component:"th",scope:"row"},"Total"),o.default.createElement(m.default,{numeric:!0},"$",r),o.default.createElement(m.default,{numeric:!0}))))),o.default.createElement(h.default,{item:!0,lg:12,className:a.wrapperNav},o.default.createElement(v.default,{className:a.buttonCart,variant:"outlined",size:"small",onClick:this.SaveOrder,component:E.Link,to:"/"},"Continue Shopping"),o.default.createElement(v.default,{className:a.buttonCart,variant:"outlined",size:"small",onClick:this.SendOrder},"CheckOut")))}}]),t}(c.Component);N.propTypes={classes:i.default.object.isRequired};t.default=(0,O.connect)(function(e){return{products:e.orders.product,total:e.orders.total}},function(e){return(0,C.bindActionCreators)({deleteProductFromOrder:S.deleteProductFromOrder,addQt:S.addQt,discardQt:S.discardQt,deleteOrder:S.deleteOrder},e)})((0,y.withStyles)(function(e){return{root:{borderRadius:0,width:"100%",marginTop:3*e.spacing.unit,padding:3*e.spacing.unit,overflowX:"auto"},table:{minWidth:360},buttonQt:{padding:"10px",minWidth:"15px",maxWidth:"35px"},wrapperNav:{textAlign:"center",marginTop:3*e.spacing.unit},buttonCart:{textTransform:"uppercase"},labelQt:{marginLeft:"15px",marginRight:"15px"},center:{textAlign:"center"},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit}}})(N))}});