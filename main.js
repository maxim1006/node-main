const o = {
    get() {console.log("this from get ", this);},
    get1: () => {console.log("this from get1 ", this);}
};

o.get();
o.get1();
