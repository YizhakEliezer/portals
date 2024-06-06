
import './main.css';
import logo from './Logo.png';
import force from './force.ico';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import Loading from "./Loading";
import { doc, setDoc, getDoc } from "firebase/firestore";


function MainComponent() {
    const [addPage, setAddPage] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('options');
    const [userName, setuserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();



    const [options, setOptions] = useState([
        { value: 'https://slp.storenext.co.il/purple-landing/dashboard?orgName=nvidia', label: 'nvidia' },
        { value: 'https://slp.storenext.co.il/purple-landing/invoice?orgName=eggedPortal', label: 'אגד' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=omrix', label: 'אומריקס' },
        { value: 'https://slp.storenext.co.il/purple-landing/acceptance?orgName=assutaDoctors', label: 'אסותא רופאים' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=bituahLeumi', label: 'ביטוח לאומי' },

        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=discount', label: 'דיסקונט' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=discountCollectionCenters', label: 'דיסקונט מרכזי גביה' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=dan', label: 'דן' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=huji', label: 'האוניברסיטה העברית' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=isracard', label: 'ישראכרט' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=stateComptrollerPortal', label: 'מבקר המדינה' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=iwi', label: 'מפעלי נשק' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=policePortal', label: 'משטרת ישראל' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=mashcal', label: 'משכל' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=mashcal', label: 'משכל כללי' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=sodaStream', label: 'סודה סטרים' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=pazPortal', label: 'פז' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=paz', label: 'פז - קבלנים' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=pazgas', label: 'פזגז' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=railwaysPortal', label: 'רכבת ישראל' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=rafael', label: 'רפאל' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=tadiran', label: 'תדיראן' },
        { value: 'https://slp.storenext.co.il/purple-landing/order?orgName=tnuvaPortal', label: 'תנובה' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/CBC/PurchaseOrder;cbc&sdoc_type=cbc_purchaseOrder', label: 'החברה המרכזית-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/CBC/goodsReceiving;cbc&sdoc_type=cbc_goodsReceiving', label: 'החברה המרכזית-קליטות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/CBC/Invoice;cbc&sdoc_type=cbc_invoice', label: 'החברה המרכזית-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/Asuta/PurchaseOrder;cons&sdoc_type=asuta_cons_purchaseOrder', label: 'אסותא כחול-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/Asuta/shipment;cons&sdoc_type=asuta_cons_shipment', label: 'אסותא כחול-תעודות משלוח' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/Asuta/entry;cons&sdoc_type=asuta_cons_entry', label: 'אסותא כחול-כניסות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/Asuta/Invoice;cons&sdoc_type=asuta_cons_invoice', label: 'אסותא כחול-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/purchaseOrder;cons&sdoc_type=mellanox_cons_purchaseOrder', label: 'מלנוקס-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/Invoice;cons&sdoc_type=mellanox_cons_invoice', label: 'מלנוקס-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/purchaseOrder;cons&sdoc_type=flextronics_cons_purchaseOrder', label: 'פלקסטורניקס-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/Invoice;cons&sdoc_type=flextronics_cons_invoice', label: 'פלקסטורניקס-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/InvoiceShlomo&sdoc_type=shlomo_cons_invoiceShlomo', label: 'שלמה סיקס-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/kadam/PurchaseOrder;kadam&sdoc_type=kadam_purchaseOrder', label: 'משהבט קדם-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/kadam/Invoice;kadam&sdoc_type=kadam_invoice', label: 'משהבט קדם-חשבוניות' },
        { value: 'https://slp.storenext.co.il/ng/projects/base/po/index.html', label: 'משהבט קדם-רספונסיבי' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/netivim/WorkOrder;netivim&sdoc_type=netivim_workOrder', label: 'משהבט נתיבים-פקא' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/netivim/serviceSheet;netivim&sdoc_type=netivim_serviceSheet', label: 'משהבט נתיבים-גליון שירות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/netivim/calcPayment;netivim&sdoc_type=netivim_calcPayment', label: 'משהבט נתיבים-תחשיב לתשלום' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/netivim/Invoice;netivim&sdoc_type=netivim_invoice', label: 'משהבט נתיבים-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/market/SupplyCommand;market&sdoc_type=market_supplyCommand', label: 'משהבט מרקט-פקא' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/market/Shipment;market&sdoc_type=market_shipment', label: 'משהבט מרקט-משלוח' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/market/calcPayment;market&sdoc_type=market_calcPayment', label: 'משהבט מרקט-תחשיב לתשלום' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/market/invoice;market&sdoc_type=market_invoice', label: 'משהבט מרקט-חשבוניות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/railways/Invoice;railways&sdoc_type=railways_invoice', label: 'רכבת כחול-חשבוניות' },
        { value: 'https://slp.storenext.co.il/ng/projects/israel_train/#/invoice', label: 'רכבת רספונסיבי' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/purchaseOrder;cons&sdoc_type=electra_cons_purchaseOrder', label: 'אלקטרה כחול-הזמנות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/shipment;cons&sdoc_type=electra_cons_shipment', label: 'אלקטרה כחול-משלוח' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/entry;cons&sdoc_type=electra_cons_entry', label: 'אלקטרה כחול-כניסות' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=slp/cons/Invoice;cons&sdoc_type=electra_cons_invoice', label: 'אלקטרה כחול-חשבוניות' },
        { value: 'https://tamir.storenext.co.il/facade.aspx?model=slp/tamir/manufacturer&sdoc_type=tamir_manufacturer', label: 'תמיר' },
        { value: 'https://slp.storenext.co.il/purple-ui-retail-chains/invoice100/propers', label: 'חשבוניות סוף חודש מזון' },
        { value: 'https://slp-traffic.storenext.co.il/facade.aspx?model=eg/aiMailBoxIn', label: 'שקוף' },
    ]);


    const [admin, setAdmin] = useState([
        { value: 'https://slp.storenext.co.il/facade.aspx?model=admin/org_details', label: 'ארגונים כחול' },
        { value: 'https://slp.storenext.co.il/facade.aspx?model=admin/User', label: 'משתמשים כחול' },
        { value: 'https://slp.storenext.co.il/purple-manager-main/org', label: 'ארגונים סגול' },
        { value: 'https://slp.storenext.co.il/purple-manager-main/user', label: 'משתמשים סגול' },
        { value: 'https://sg.storenext.co.il/digital-sign-admin/users', label: 'signGete  משתמשים' },
        { value: 'https://tamir.storenext.co.il/facade.aspx?model=admin/User', label: 'משתמשים תמיר' },

    ]);


    const [fmcg, setFmcg] = useState([
        { value: 'https://slp-traffic.storenext.co.il/facade.aspx?model=eg/aiMailBoxIn', label: 'שקוף' },
        { value: 'http://172.16.2.241:5555/GXSMailbox/', label: 'eg' },
        { value: 'https://backoffice.comax.co.il/Max2000BackOffice/WEB/Login_G.asp?LogOn=OK', label: 'קומקס' },
        { value: 'https://sl.storenext.co.il/Public/Default.aspx?#?model=DocsConcentrait.xml', label: 'פורטל צהוב' },


    ]);



    const [general, setGeneral] = useState([
        { value: 'https://www.10bis.co.il/next/restaurants/search/', label: 'תן ביס' },
        { value: 'https://centrex.bezeq.com/login', label: 'בזק סנטריקס' },
        { value: 'https://harmony.synel.co.il/eharmonynew#home', label: 'דוח כניסה ויציאה' },
        { value: 'http://10.98.5.68/Optimus/login?returnUrl=%2F', label: 'סרגל נציג' },
        { value: 'https://storenextcoil.sharepoint.com/:x:/s/Project_Tiketim/EcwK6G8x1PlBkQA6Hi5Uc_MBvGGsepdKy7Gw0Pogn5C-3A?e=4%3AWprBqe&fromShare=true&at=9&CID=B4B60EF5-4822-4DF8-893E-596B8FE1C739&wdLOR=cBD8DB42C-DA41-4FE6-AB72-FF7FFBAEE6AD', label: 'יירוטים' },
        { value: 'https://forms.office.com/Pages/ResponsePage.aspx?id=BXD0sUl2sUuDckfZ5Ygmjsj69PZBZ0ZFoHMbVFYrOEtUNFlZQzBVNTlXUE0zQjNYOTU3WlFXS1lWWSQlQCN0PWcu', label: 'יירוטים לחזרה' },
        { value: 'http://crmapp-15-prod/StorenextLtd/main.aspx#905714629', label: 'crm ישן' },
        { value: 'https://rosn03.storenext.co.il/dana-na/auth/url_wnHrJ8rwweAC0aey/welcome.cgi', label: 'ro כניסה לAD' },
        { value: 'https://storenext.talentlms.com/dashboard', label: 'לומדות' },
    ]);



    const handleChange = (selectedOption) => {
        window.open(selectedOption.value, '_blank');
    };






    // const addOption = () => {
    //     const newOption = { value: url, label: name };

    //     switch (selectedCategory) {
    //         case 'options':
    //             setOptions([...options, newOption]);
    //             break;
    //         case 'admin':
    //             setAdmin([...admin, newOption]);
    //             break;
    //         case 'fmcg':
    //             setFmcg([...fmcg, newOption]);
    //             break;
    //         case 'general':
    //             setGeneral([...general, newOption]);
    //             break;
    //         default:
    //             break;
    //     }

    //     localStorage.setItem(name, JSON.stringify(newOption));
    //     setAddPage(false);
    //     setName('');
    //     setUrl('');
    //     setSelectedCategory('');
    // };











    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };






    useEffect(() => {
        const fetchTasks = async (user) => {
            try {
                const userDoc = doc(database, 'users', user.uid); // התייחסות למסמך המשתמש ב-Firebase
                setUserId(user.uid)
                const userSnapshot = await getDoc(userDoc); // קבלת נתוני המשתמש מ-Firebase
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    //   setTasks(userData.tasks || []); // עדכון רשימת המשימות מהנתונים שהתקבלו
                }
            } catch (error) {
                console.error("Error fetching user data:", error); // טיפול בשגיאה במקרה של בעיה בקבלת הנתונים
            } finally {
                setIsLoading(false);
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user.displayName) {
                if (user.displayName.length > 8) {
                    setuserName(user.displayName.substring(0, 8) + "...");
                } else {
                    setuserName(user.displayName);
                }
            } else {
                if (user.email.length > 8) {
                    setuserName(user.email.substring(0, 8) + "...");
                } else {
                    setuserName(user.email);
                }
            }


            if (user) {
                fetchTasks(user); // קריאה לפונקציה לקבלת המשימות
            } else {
                // setTasks([]); // איפוס רשימת המשימות במקרה שאין משתמש מחובר
            }
        });

        return () => unsubscribe(); // ביטול הרישום להתראות על שינוי במצב האותנטיקציה
    }, []);
















    useEffect(() => {
        // Get options from localStorage
        const savedOptions = JSON.parse(localStorage.getItem('options')) || [];
        if (savedOptions.length > 0) {
            setOptions(savedOptions);
        }
    
        const savedAdmin = JSON.parse(localStorage.getItem('admin')) || [];
        if (savedAdmin.length > 0) {
            setAdmin(savedAdmin);
        }
    
        const savedFmcg = JSON.parse(localStorage.getItem('fmcg')) || [];
        if (savedFmcg.length > 0) {
            setFmcg(savedFmcg);
        }
    
        const savedGeneral = JSON.parse(localStorage.getItem('general')) || [];
        if (savedGeneral.length > 0) {
            setGeneral(savedGeneral);
        }
    }, []);
    
    // Handle adding new items
    const handleAddItem = (item, category) => {
        switch (category) {
            case 'options':
                setOptions(prevOptions => [...prevOptions, item]);
                localStorage.setItem('options', JSON.stringify([...options, item]));
                break;
            case 'admin':
                setAdmin(prevAdmin => [...prevAdmin, item]);
                localStorage.setItem('admin', JSON.stringify([...admin, item]));
                break;
            case 'fmcg':
                setFmcg(prevFmcg => [...prevFmcg, item]);
                localStorage.setItem('fmcg', JSON.stringify([...fmcg, item]));
                break;
            case 'general':
                setGeneral(prevGeneral => [...prevGeneral, item]);
                localStorage.setItem('general', JSON.stringify([...general, item]));
                break;
            default:
                break;
        }
    };
    
    
    

    

    



    const addOption = () => {
        const newOption = { value: url, label: name };
    
        switch (selectedCategory) {
            case 'options':
                setOptions([...options, newOption]);
                localStorage.setItem('options', JSON.stringify([...options, newOption]));
                break;
            case 'admin':
                setAdmin([...admin, newOption]);
                localStorage.setItem('admin', JSON.stringify([...admin, newOption]));
                break;
            case 'fmcg':
                setFmcg([...fmcg, newOption]);
                localStorage.setItem('fmcg', JSON.stringify([...fmcg, newOption]));
                break;
            case 'general':
                setGeneral([...general, newOption]);
                localStorage.setItem('general', JSON.stringify([...general, newOption]));
                break;
            default:
                break;
        }
    
        setAddPage(false);
        setName('');
        setUrl('');
        setSelectedCategory('');
    };
    




if (isLoading) {
    return <Loading />;
}



return (
    <div className="container">
        {/* <button onClick={saveDataToFirestore}>vv</button> */}
        <div className="titel-container-home">
            <p className="nameUser">{userName}</p>
            <button onClick={handleSignOut} className="signOut">Sign Out</button>
        </div>
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
        </div>
        <div className='button-main-portals'>
            <a href="https://slp.storenext.co.il/facade.aspx?model=admin/User" target='_blank'><button className='blue-portal'>פורטל כחול</button></a>
            <a href="https://slp.storenext.co.il/purple-landing/invoice?orgName=all" target='_blank'><button className='purple-portal'>פורטל סגול</button></a>
            <a href="https://slp-traffic.storenext.co.il/facade.aspx?model=eg/aiMailBoxIn" target='_blank'><button className='purple-clear'>פורטל שקוף</button></a>
            <a href="https://sl.storenext.co.il/Public/Default.aspx?#?model=DocsConcentrait.xml" target='_blank'><button className='purple-yelloew'>פורטל צהוב</button></a>
            <a href="https://slp.storenext.co.il/purple-ui-retail-chains/invoice100/propers" target='_blank'><button className='purple-portal'>פורטל חשבוניות סוף חודש</button></a>
            <a href="http://172.16.2.241:5555/GXSMailbox/" target='_blank'><button className='eg'>EG</button></a>




        </div>
        <div className='force'>
            <a href="https://storenext.lightning.force.com/lightning/page/home" target='_blank'><button className=''><img src={force} />force</button></a>
        </div>






        <div className='select-main'>

            <div className='select-poral'>
                <button onClick={() => { setAddPage(true); setSelectedCategory('options'); }}>+ הוסף פורטל</button>
                <h4>פורטלים כחול+סגול+תמיר+חשבוניות מזון+שקוף</h4>
                <Select options={options} onChange={handleChange} placeholder="בחר פורטל" />



            </div>


            <div className='select-admin'>
                <button onClick={() => { setAddPage(true); setSelectedCategory('admin'); }}>+ הוסף פורטל</button>
                <h4>מסכי ניהול+כחול+תמיר+סגול+signGete</h4>
                <Select options={admin} onChange={handleChange} placeholder="בחר פורטל" />

            </div>


            <div className='select-fmcg'>
                <button onClick={() => { setAddPage(true); setSelectedCategory('fmcg'); }}>+ הוסף פורטל</button>
                <h4>פורטלים מזון</h4>
                <Select options={fmcg} onChange={handleChange} placeholder="בחר פורטל" />
            </div>


            <div className='select-general'>
                <button onClick={() => { setAddPage(true); setSelectedCategory('general'); }}>+ הוסף בחירה</button>
                <h4>כללי</h4>
                <Select options={general} onChange={handleChange} placeholder="בחר בחירה" />
            </div>




        </div>





        {addPage ?
            <div className='add-page'>
                <div className='props-task'>
                    <label>שם הפורטל</label>
                    <input type='text' onChange={(e) => { setName(e.target.value) }}></input>
                    <label>URL</label>
                    <input type='text' onChange={(e) => { setUrl(e.target.value) }}></input>
                    <button onClick={addOption}>הוסף</button>

                </div>
            </div>
            : null
        }




    </div>
);

}






export default MainComponent;
