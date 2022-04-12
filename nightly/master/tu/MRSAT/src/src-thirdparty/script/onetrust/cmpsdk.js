var OTCMP;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startSDK": () => (/* binding */ startSDK),
/* harmony export */   "getDataSubjectIdentifier": () => (/* binding */ getDataSubjectIdentifier),
/* harmony export */   "setDataSubjectIdentifier": () => (/* binding */ setDataSubjectIdentifier),
/* harmony export */   "getOTSDKData": () => (/* binding */ getOTSDKData),
/* harmony export */   "shouldShowBanner": () => (/* binding */ shouldShowBanner),
/* harmony export */   "getPurposesList": () => (/* binding */ getPurposesList),
/* harmony export */   "getSavedProfile": () => (/* binding */ getSavedProfile),
/* harmony export */   "updatePurposeConsent": () => (/* binding */ updatePurposeConsent),
/* harmony export */   "updatePurposeLegitInterest": () => (/* binding */ updatePurposeLegitInterest),
/* harmony export */   "saveConsent": () => (/* binding */ saveConsent),
/* harmony export */   "preferenceCenterClose": () => (/* binding */ preferenceCenterClose),
/* harmony export */   "clearOTSDKData": () => (/* binding */ clearOTSDKData),
/* harmony export */   "getConsentStatus": () => (/* binding */ getConsentStatus),
/* harmony export */   "downloadStorageDisclosure": () => (/* binding */ downloadStorageDisclosure),
/* harmony export */   "getGoogleVendorList": () => (/* binding */ getGoogleVendorList),
/* harmony export */   "getVendorList": () => (/* binding */ getVendorList),
/* harmony export */   "getVendorDetails": () => (/* binding */ getVendorDetails),
/* harmony export */   "getSavedVendorConsents": () => (/* binding */ getSavedVendorConsents),
/* harmony export */   "getSavedGoogleVendorConsents": () => (/* binding */ getSavedGoogleVendorConsents),
/* harmony export */   "getSavedVendorLegitInterest": () => (/* binding */ getSavedVendorLegitInterest),
/* harmony export */   "toggleVendorsConsentUi": () => (/* binding */ toggleVendorsConsentUi),
/* harmony export */   "updateVendorConsent": () => (/* binding */ updateVendorConsent),
/* harmony export */   "updateVendorLegitInterest": () => (/* binding */ updateVendorLegitInterest),
/* harmony export */   "getBannerData": () => (/* binding */ getBannerData),
/* harmony export */   "getPreferenceCenterData": () => (/* binding */ getPreferenceCenterData),
/* harmony export */   "getVendorPageData": () => (/* binding */ getVendorPageData),
/* harmony export */   "setupUI": () => (/* binding */ setupUI),
/* harmony export */   "OTSDK_logger": () => (/* binding */ OTSDK_logger),
/* harmony export */   "filterVendorListBy": () => (/* binding */ filterVendorListBy),
/* harmony export */   "OTBackButtonMode": () => (/* binding */ OTBackButtonMode),
/* harmony export */   "performAutomaticReconsentOverride": () => (/* binding */ performAutomaticReconsentOverride)
/* harmony export */ });
const startSDK = async sdk_keys => {
    try {

        const performanceMetric4Start = Date.now();

        // if we have different keys from what was last passed in, clear everything from disk.
        const cached_OneTrust_sdk_keys_encoded = localStorage.getItem("OneTrust_sdk_keys");
        if (cached_OneTrust_sdk_keys_encoded && btoa(JSON.stringify(sdk_keys)) !== cached_OneTrust_sdk_keys_encoded) {
            clearOTSDKData();
        }


        const myHeaders = new Headers();
        let didSyncProfile = false;

        // required parms
        myHeaders.append("location", sdk_keys["storageLocation"]);
        myHeaders.append("application", sdk_keys["domainIdentifier"]);
        myHeaders.append("lang", sdk_keys["languageCode"]);
        myHeaders.append("sdkVersion", sdk_keys["apiVersion"]);


        // optional geo support
        if (sdk_keys.hasOwnProperty("countryCodeOverride")) {
            myHeaders.append("OT-Country-Code", sdk_keys["countryCodeOverride"]);
        }
        if (sdk_keys.hasOwnProperty("regionCodeOverride")) {
            myHeaders.append("OT-Region-Code", sdk_keys["regionCodeOverride"])
        }

        // optional cross device support
        if (sdk_keys.hasOwnProperty("syncProfileAuth")) {
            myHeaders.append("syncProfileAuth", sdk_keys["syncProfileAuth"]);
            myHeaders.append("fetchType", "APP_DATA_AND_SYNC_PROFILE");
        }


        if (sdk_keys.hasOwnProperty("identifier")) {
            setDataSubjectIdentifier(sdk_keys["identifier"]);
            myHeaders.append("identifier", sdk_keys["identifier"]);
        }


        if (sdk_keys.hasOwnProperty("syncProfileAuth")) {
            myHeaders.append("profileSyncETag", geteTag());
        }


        // options
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // send and wait for response
        const performanceMetric1Start = Date.now();
        const response = await fetch(sdk_keys["domaindata_url"], requestOptions)
            .catch(error => {
                throw error;
            });

        // check if response worked (no 404 errors etc...)
        if (!response.ok) {
            OTSDK_logger("response.statusText -> " + response.statusText);
            throw new Error(response.statusText);
        }

        // convert the response to JSON
        const data = await response.json(); // get JSON from the response
        OTSDK_performance_logger(1,performanceMetric1Start, Date.now());
        OTSDK_logger("response -> " + JSON.stringify(data));

        // TEMP FIX UNTIL JSON IS FIXED.
        const groups = data["culture"]["DomainData"]["Groups"];
        for (const recordID in groups) {
            const record = groups[recordID];
            const groupType =  record['Type']
            if (groupType === 'IAB2_SPL_FEATURE') {
                record['HasLegIntOptOut'] = false;
            }
        }

        // ////////////////////////////////////////////////////////////////////////////////
        // PROFILE SYNC RULES
        // ////////////////////////////////////////////////////////////////////////////////
        const profileStatusCode = data["status"]["profile"]["code"];
        if (profileStatusCode && profileStatusCode === 200) {
            const records = data["profile"]["sync"]["preferences"];
            for (const recordID in records) {
                const record = records[recordID];
                const purposeID = record["id"];
                const updatedAfterSync = record["updatedAfterSync"];
                if (updatedAfterSync) {
                    const CustomGroupId = getGroupIDFromPurposeID(purposeID, data);
                    if (CustomGroupId) {
                        const newValue = translateSyncStatusValue(record["status"], data);
                        const storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;
                        localStorage.setItem(storageKeyName, newValue);
                        didSyncProfile = true;
                    }
                }
            }

            if (data["profile"]["sync"].hasOwnProperty("parentToggleState")) {
                const parentToggleState = data["profile"]["sync"]["parentToggleState"];
                for (const [key, value] of Object.entries(parentToggleState)) {
                    const newValue = translateSyncStatusValue(value, data);
                    const storageKeyName = "OneTrust_CustomGroupId_" + key;
                    localStorage.setItem(storageKeyName, newValue);
                }
            }

            if(data["profile"]["fetch"].hasOwnProperty("syncGroups")) {
                const syncGroups = data["profile"]["fetch"]["syncGroups"];
                const syncGroupId = data["domain"]["SyncGroupId"];
                if(syncGroups.hasOwnProperty(syncGroupId)){
                    const purposeLI = syncGroups[syncGroupId]["tcStringV2Decoded"]["purpose"]["legitimateInterests"];
                    const purposeLIArr = purposeLI.split("");
                    for(var i=0;i<purposeLIArr.length-1;i++){
                        const storageKeyName = "OneTrust_CustomGroupId_LI_IABV2_" + (i+1);
                        var status = "inactive";
                        if(purposeLIArr[i] === "1"){
                            status = "active";
                        }
                        localStorage.setItem(storageKeyName, status);
                    }
                }

            }

        }


        // ////////////////////////////////////////////////////////////////////////////////
        // Rules for Reconsent
        // ////////////////////////////////////////////////////////////////////////////////
        const serverlLastReconsentDate = data["culture"]["DomainData"]["LastReconsentDate"];
        if (serverlLastReconsentDate != null) {
            const lastLocalConsentDate = localStorage.getItem("OneTrust_lastConsentDate");
            if (lastLocalConsentDate) {
                if (parseFloat(lastLocalConsentDate) < parseFloat(serverlLastReconsentDate)) {
                    //clearOTSDKData();
                    clearIABLocalPurposes();
                }
            }
        }




        // ////////////////////////////////////////////////////////////////////////////////
        // Rules for Reconsent Auto Expire Check
        // ////////////////////////////////////////////////////////////////////////////////
        const lastLocalConsentDate = localStorage.getItem("OneTrust_lastConsentDate");
        if (lastLocalConsentDate) {

            const ReconsentFrequencyDays = data["culture"]["DomainData"]["ReconsentFrequencyDays"];
            if (ReconsentFrequencyDays != null) {

                const date1 = new Date(parseFloat(lastLocalConsentDate));
                const date2 = new Date();
                const difference = date2.getTime() - date1.getTime();
                const daysOld = Math.ceil(difference / (1000 * 3600 * 24));

                if (daysOld > ReconsentFrequencyDays) {
                    //clearOTSDKData();
                    clearIABLocalPurposes();
                }

            }
        }


        // ////////////////////////////////////////////////////////////////////////////////
        // cache the data
        // ////////////////////////////////////////////////////////////////////////////////
        localStorage.setItem("OneTrust_sdk_data", JSON.stringify(data));
        localStorage.setItem("OneTrust_sdk_keys", btoa(JSON.stringify(sdk_keys)));

        // clear the IAB data if the shouldShowBannerAsConsentExpired is set to true
        if (profileStatusCode && profileStatusCode === 200) {
            const shouldShowBannerAsConsentExpired = data["profile"]["sync"]["shouldShowBannerAsConsentExpired"];
            if(shouldShowBannerAsConsentExpired){
                clearIABLocalPurposes();
            }
        }

        // ////////////////////////////////////////////////////////////////////////////////
        // download the vendor list if needed
        // ////////////////////////////////////////////////////////////////////////////////
        await downloadVendorList();


        // ////////////////////////////////////////////////////////////////////////////////
        // download the google vendor list if needed
        // ////////////////////////////////////////////////////////////////////////////////
        const mobileData = data["culture"]["MobileData"]["preferenceCenterData"]["googleVendors"]["general"];
        if(mobileData.show){
            await downloadGoogleVendorList();
        }



        // ////////////////////////////////////////////////////////////////////////////////
        // write the ccpa string to disk if needed.
        // ////////////////////////////////////////////////////////////////////////////////
        writeCCPAString()


        // ////////////////////////////////////////////////////////////////////////////////
        // write the IAB TC String to disk if needed.
        // ////////////////////////////////////////////////////////////////////////////////
        if (didSyncProfile) { writeTCString(); }

        triggerConsentEv(); // Trigger event with initial consent status

        // ////////////////////////////////////////////////////////////////////////////////
        // returns a promise, which resolves to this data value
        // ////////////////////////////////////////////////////////////////////////////////
        OTSDK_performance_logger(4,performanceMetric4Start, Date.now());
        return data;


    } catch (error) {
        throw error;

    }

}


function getDataSubjectIdentifier() {
    let answer = localStorage.getItem("OneTrust_datasubjectID");
    if (!answer) {
        answer = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        answer = btoa(answer);
        localStorage.setItem("OneTrust_datasubjectID", answer);
        localStorage.setItem("OneTrust_datasubjectID_known", 'false');
    }
    return atob(answer);
}


function setDataSubjectIdentifier(value) {
    localStorage.setItem("OneTrust_datasubjectID", btoa(value));
    localStorage.setItem("OneTrust_datasubjectID_known", 'true');
}


function getOTSDKData() {
    const OneTrust_sdk_data = localStorage.getItem("OneTrust_sdk_data");
    return JSON.parse(OneTrust_sdk_data);
}



/**
 * @return {boolean}
 */
function shouldShowBanner() {

    try {
        const sdkData = getOTSDKData();
        // Make Sure We Have Data To Work With
        if (!sdkData) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        const geoRule = sdkData["culture"]["DomainData"]["ShowAlertNotice"];
        if (!geoRule) {
            OTSDK_logger("shouldShowBanner -> false because culture.DomainData.ShowAlertNotice is false");
            return false;
        }

        if (!lastReconsentDatesMatch()) {
            OTSDK_logger("shouldShowBanner -> true because lastReconsentDatesMatch === false");
            return true;
        }


        if (didReconsentFrequencyDaysExpire()) {
            OTSDK_logger("shouldShowBanner -> true because didReconsentFrequencyDaysExpire === true");
            return true;
        }


        if (isCrossDevice() && allPurposesUpdatedAfterSync()) {
            OTSDK_logger("shouldShowBanner -> false because allPurposesUpdatedAfterSync === true ");
            return false;
        }


        if (isCrossDevice() && hasNewCategoriesSinceLastLocalInteraction()) {
            OTSDK_logger("shouldShowBanner -> true because we're cross-device and we have new categories since last interaction.");
            return true;
        }


        if (localStorage.getItem("OneTrust_lastConsentDate")) {
            OTSDK_logger("shouldShowBanner -> false because user already taken action locally: OneTrust_lastConsentDate = " + localStorage.getItem("OneTrust_lastConsentDate"));
            return false;
        }

        // if we go this far, show the banner
        OTSDK_logger("shouldShowBanner -> true - no other rules match.");
        return true;


    } catch (error) {
        throw error;

    }

}



// export function getPurposesList() {
//
//     try {
//         const sdkData = getOTSDKData();
//         // Make Sure We Have Data To Work With
//         if (!sdkData) {
//             throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
//         }
//
//         // return the answer
//         return sdkData["culture"]["DomainData"]["Groups"];
//
//     } catch (error) {
//         throw error;
//
//     }
// }


function getPurposesList() {

    try {
        const sdkData = getOTSDKData();

        // ///////////////////////////////////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////////////////////////////////
        if (!sdkData) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // ///////////////////////////////////////////////////////////////////////////
        // Loop through groups and get any items saved to disk
        // ///////////////////////////////////////////////////////////////////////////
        const answer = [];
        const validGroups = getValidGroup();

        const vendorConsentModel = sdkData["culture"]["DomainData"]["VendorConsentModel"];
        const defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out");  // opt-out = ON by default

        // we need to add any un-saved user changes too.
        let saveQueue = [];
        const otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) { saveQueue = JSON.parse(otsdk_saveQueue_str); }


        for (const indexID in validGroups) {

            if (!validGroups.hasOwnProperty(indexID)) {
                continue;
            }

            const thisItem = validGroups[indexID];
            const CustomGroupId = thisItem["CustomGroupId"];

            let ConsentStatus = thisItem["Status"];
            let storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;
            let savedStatus = localStorage.getItem(storageKeyName);
            if (savedStatus) { ConsentStatus = savedStatus; }

            // MOB-5335
            // if TCF purpose 1 not disclosed to the user then PurposeOneTreatment == 1...  user can't consent, so make it inactive.
            if (CustomGroupId === 'IABV2_1' && getPurposeOneTreatment() === 1) {
                ConsentStatus = "inactive";
            }

            thisItem["Status"] = ConsentStatus;
            thisItem["UIState_Status"] = ConsentStatus;


            // if we have an item in the save queue, then add that to the payload too.
            let saveQueueItems = saveQueue.filter(function (item) { return item.storageKeyName === "OneTrust_CustomGroupId_" + CustomGroupId });
            if (saveQueueItems && saveQueueItems.length > 0) {
                thisItem["UIState_Status"] = saveQueueItems[0].newValue;
            }


            // if this item is using LI, lets add that to the dict too.
            if (thisItem.HasLegIntOptOut) {
                let liConsentStatus = "active"; //defaultConsentStatus ? "active" : "inactive";
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                savedStatus = localStorage.getItem(storageKeyName);
                if (savedStatus) {
                    liConsentStatus = savedStatus;
                }

                thisItem["UIState_LI"] = liConsentStatus;
                thisItem["LI"] = liConsentStatus;

                // if we have an LI item in the save queue, then add that to the payload too.
                saveQueueItems = saveQueue.filter(function (item) { return item.storageKeyName === "OneTrust_CustomGroupId_LI_" + CustomGroupId });
                if (saveQueueItems && saveQueueItems.length > 0) {
                    thisItem["UIState_LI"] = saveQueueItems[0].newValue;
                }

            }

            answer.push(thisItem);

        }


        // return the answer
        return answer;

    } catch (error) {
        throw error;

    }

}



function getSavedProfile() {

    try {
        const sdkData = getOTSDKData();

        // ///////////////////////////////////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////////////////////////////////
        if (!sdkData) { throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION"; }


        // ///////////////////////////////////////////////////////////////////////////
        // Loop through groups and get any items saved to disk
        // ///////////////////////////////////////////////////////////////////////////
        const answer = {};
        const validGroups = getValidGroup();

        const vendorConsentModel = sdkData["culture"]["DomainData"]["VendorConsentModel"];
        const defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out");  // opt-out = ON by default
        let answerItem;


        for (const indexID in validGroups) {

            answerItem = {};

            if ( !validGroups.hasOwnProperty(indexID) ) { continue; }

            const thisItem = validGroups[indexID];

            if ( thisItem.isParent ) { continue; }

            const CustomGroupId = thisItem["CustomGroupId"];
            let ConsentStatus = thisItem["Status"];

            let storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;
            let savedStatus = localStorage.getItem(storageKeyName);
            if (savedStatus) { ConsentStatus = savedStatus; }

            // MOB-5335
            // if TCF purpose 1 not disclosed to the user then PurposeOneTreatment == 1...  user can't consent, so make it inactive.
            if (CustomGroupId === 'IABV2_1' && getPurposeOneTreatment() === 1) {
                ConsentStatus = "inactive";
            }


            answerItem["consent"] = ConsentStatus !== "inactive";

            // if this item is using LI, lets add that to the dict too.
            if (thisItem.HasLegIntOptOut) {

                let liConsentStatus = defaultConsentStatus ? "active" : "inactive";
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;

                if ( localStorage.hasOwnProperty(storageKeyName) ) {
                    liConsentStatus = localStorage.getItem(storageKeyName);
                }

                answerItem["legitInt"] = liConsentStatus !== "inactive";

            }

            answerItem["name"] = thisItem["GroupName"];
            answerItem["type"] = thisItem["Type"];
            answerItem["purposeId"] = thisItem["PurposeId"];


            answer[CustomGroupId] = answerItem;

        }


        // return the answer
        return answer;

    } catch (error) {
        throw error;

    }

}


function updatePurposeConsent(categoryId, boolConsentValue) {

    try {

        // ///////////////////////////////////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////////////////////////////////
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        const storageKeyName = "OneTrust_CustomGroupId_" + categoryId;

        let otsdk_saveQueue = [];

        const otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }


        // make sure I can really update this...
        const records = getPurposesList();
        for (const recordID in records) {
            const record = records[recordID];
            if (record["CustomGroupId"] === categoryId) {
                const Status = record["Status"];
                if (Status === "active" || Status.toLowerCase() === "inactive") {

                    // remove any dups
                    for (var i = 0; i < otsdk_saveQueue.length; i++) {
                        if (otsdk_saveQueue[i].storageKeyName === storageKeyName) {
                            otsdk_saveQueue.splice(i, 1);
                            i--;
                        }
                    }

                    // add to the save queue
                    otsdk_saveQueue.push({
                        "storageKeyName": storageKeyName,
                        "CustomGroupId": categoryId,
                        "newValue": (boolConsentValue ? "active" : "inactive")
                    })

                }
                break;
            }
        }

        // write the queue to disk
        localStorage.setItem("OneTrust_saveQueue", JSON.stringify(otsdk_saveQueue));


    } catch (error) {
        throw error;

    }
}

function updatePurposeLegitInterest(categoryId, boolConsentValue) {

    try {

        // ///////////////////////////////////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////////////////////////////////
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        const storageKeyName = "OneTrust_CustomGroupId_LI_" + categoryId;
        let otsdk_saveQueue = [];

        const otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        // make sure I can really update this...
        const records = getPurposesList();
        for (const recordID in records) {
            const record = records[recordID];
            if (record["CustomGroupId"] === categoryId) {
                if (record.HasLegIntOptOut) {

                    // remove any dups
                    for (let i = 0; i < otsdk_saveQueue.length; i++) {
                        if (otsdk_saveQueue[i].storageKeyName === storageKeyName) {
                            otsdk_saveQueue.splice(i, 1);
                            i--;
                        }
                    }

                    // add to the save queue
                    otsdk_saveQueue.push({
                        "storageKeyName": storageKeyName,
                        "CustomGroupId": categoryId,
                        "newValue": (boolConsentValue ? "active" : "inactive")
                    });

                }
                break;
            }
        }

        // write the queue to disk
        localStorage.setItem("OneTrust_saveQueue", JSON.stringify(otsdk_saveQueue));


    } catch (error) {
        throw error;

    }

}

const preferenceCenterConfirm = async () => {

    let record;
    try {

        OTSDK_logger("onPreferenceCenterConfirmChoices called");


        // ///////////////////////////////////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////////////////////////////////
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // ///////////////////////////////////////////////////////////////////////////
        // IF WE HAVE SOMETHING IN A QUEUE TO SAVE, SAVE IT TO DISK NOW
        // ///////////////////////////////////////////////////////////////////////////

        let otsdk_saveQueue = [];
        const otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        for (const keyName in otsdk_saveQueue) {
            record = otsdk_saveQueue[keyName];
            if (record) {
                localStorage.setItem(record["storageKeyName"], record["newValue"]);
            }
        }


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        const records = getPurposesList();
        const sendTheseRecordsToOneTrust = [];

        for (const recordID in records) {
            record = records[recordID]

            let transactionType = "UNKNOWN";
            const Status = record["Status"].toString();
            const PurposeId = record["PurposeId"];

            if (Status === "active") {
                transactionType = "CONFIRMED";
            } else if (Status.toLowerCase() === "inactive") {
                transactionType = "OPT_OUT";
            } else if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
            } else if (Status.toLowerCase() === "inactive landingpage") {
                transactionType = "CONFIRMED";
            }

            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        const purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }

        }



        // /////////////////////////
        //  save any queued vendor changes too
        // /////////////////////////
        await vendorsSaveChanges()


        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Preference Center - Confirm");

        // we processed the data, now we can clear the queue.
        localStorage.setItem("OneTrust_saveQueue", JSON.stringify([]));

        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}

async function saveConsent(action) {
    switch (action) {
        case 'bannerAllowAll':
            return bannerAccept();
        case 'bannerRejectAll':
            return bannerRejectAll();
        case 'bannerClose':
            return bannerClose();
        case 'preferenceCenterAllowAll':
            return preferenceCenterAcceptAll();
        case 'preferenceCenterRejectAll':
            return preferenceCenterRejectAll();
        case 'preferenceCenterConfirm':
            return preferenceCenterConfirm();
        case 'bannerBack':
            return bannerBack();
    }
}

const bannerAccept = async () => {

    try {


        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        OTSDK_logger("onBannerClickedAcceptAll called");

        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        const records = getPurposesList();
        const sendTheseRecordsToOneTrust = [];

        for (const recordID in records) {
            const record = records[recordID];

            let transactionType = "UNKNOWN";
            const Status = record["Status"].toString();
            const PurposeId = record["PurposeId"];
            const CustomGroupId = record["CustomGroupId"];
            let storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;

            if (Status === "active") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, "active");
            } else if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive landingpage") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, Status);
            }

            // handle consents
            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        const purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }

            // Handle LI values
            if (record["LI"]) {
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                localStorage.setItem(storageKeyName, "active");
            }

        }



        // /////////////////////////
        //  accept all vendors too
        // /////////////////////////
        await toggleVendors(true);


        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Banner - Allow All");

        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}


const bannerRejectAll = async () => {

    try {

        OTSDK_logger("onBannerClickedRejectAll called");


        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        var records = getPurposesList();
        var sendTheseRecordsToOneTrust = [];

        for (var recordID in records) {
            var record = records[recordID]


            var transactionType = "UNKNOWN";
            var Status = record["Status"].toString();
            var PurposeId = record["PurposeId"];
            var CustomGroupId = record["CustomGroupId"];
            var storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;

            if (Status === "active") {
                transactionType = "OPT_OUT";
                localStorage.setItem(storageKeyName, "inactive");
            } else if (Status.toLowerCase() === "inactive") {
                transactionType = "OPT_OUT";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive landingpage") {
                transactionType = "OPT_OUT";
                localStorage.setItem(storageKeyName, Status);
            }

            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        var purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }

            // Handle LI values
            if (record["LI"]) {
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                localStorage.setItem(storageKeyName, "inactive");
            }

        }


        // /////////////////////////
        //  reject all vendors too
        // /////////////////////////
        await toggleVendors(false);


        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Banner - Reject All");


        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}


const bannerClose = async () => {

    try {

        OTSDK_logger("onBannerClose called");

        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        var records = getPurposesList();
        var sendTheseRecordsToOneTrust = [];

        for (var recordID in records) {
            var record = records[recordID]


            var transactionType = "UNKNOWN";
            var Status = record["Status"].toString();
            var PurposeId = record["PurposeId"];
            var CustomGroupId = record["CustomGroupId"];
            var storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;

            if (Status === "active") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive") {
                transactionType = "NOTGIVEN";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive landingpage") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, Status);
            }

            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        var purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }


            // Handle LI values
            if (record["LI"]) {
                var vendorConsentModel = getOTSDKData()["culture"]["DomainData"]["VendorConsentModel"];
                var defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out");  // opt-out = ON by default
                var liConsentStatus = defaultConsentStatus ? "active" : "inactive";
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                localStorage.setItem(storageKeyName, liConsentStatus);
            }

        }



        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Banner - Close");


        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        OTSDK_logger("ON_HIDE_BANNER");

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}

const bannerBack = async () => {
    try {
        const bannerBackMode = getBannerBackMode();
        OTSDK_logger("onBannerBack called");
        if(bannerBackMode !== null){
            if(bannerBackMode === "DISMISS_BANNER"){
                // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
                await updateLastConsentDate();
                OTSDK_logger("Dismiss Banner UI");
                return {"info": "Dismiss the banner UI"};
            }
            else{
                OTSDK_logger("Dismiss Banner UI & save consent");
                const response = await bannerClose();
                return response;
            }
        }
        else{
            return {"error": "NO_ACTION"};
        }


    } catch (error) {
        throw error;

    }

}


const preferenceCenterAcceptAll = async () => {

    try {


        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        const records = getPurposesList();
        const sendTheseRecordsToOneTrust = [];

        for (const recordID in records) {
            const record = records[recordID];

            let transactionType = "UNKNOWN";
            const Status = record["Status"].toString();
            const PurposeId = record["PurposeId"];
            const CustomGroupId = record["CustomGroupId"];
            let storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;

            if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
                localStorage.setItem(storageKeyName, Status);
            } else {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, "active");
            }

            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        const purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }

            // Handle LI values
            if (record["LI"]) {
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                localStorage.setItem(storageKeyName, "active");
            }

        }


        // /////////////////////////
        //  accept all vendors too
        // /////////////////////////
        await toggleVendors(true);



        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Preference Center - Allow All");

        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}


const preferenceCenterRejectAll = async () => {

    try {


        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();


        // /////////////////////////
        // PREP DATA
        // /////////////////////////

        var records = getPurposesList();
        var sendTheseRecordsToOneTrust = [];

        for (var recordID in records) {
            var record = records[recordID]

            var transactionType = "UNKNOWN";
            var Status = record["Status"].toString();
            var PurposeId = record["PurposeId"];
            var CustomGroupId = record["CustomGroupId"];
            var storageKeyName = "OneTrust_CustomGroupId_" + CustomGroupId;

            if (Status === "active") {
                transactionType = "OPT_OUT";
                localStorage.setItem(storageKeyName, "inactive");
            } else if (Status.toLowerCase() === "inactive") {
                transactionType = "OPT_OUT";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "always active") {
                transactionType = "NO_CHOICE";
                localStorage.setItem(storageKeyName, Status);
            } else if (Status.toLowerCase() === "inactive landingpage") {
                transactionType = "CONFIRMED";
                localStorage.setItem(storageKeyName, Status);
            }

            if (PurposeId) {
                if (PurposeId.toString().trim().length > 0) {
                    if (transactionType !== "UNKNOWN") {
                        var purposeRecord = {};
                        purposeRecord["Id"] = PurposeId;
                        purposeRecord["TransactionType"] = transactionType;
                        sendTheseRecordsToOneTrust.push(purposeRecord);
                    }
                }
            }

            // Handle LI values
            if (record["LI"]) {
                storageKeyName = "OneTrust_CustomGroupId_LI_" + CustomGroupId;
                localStorage.setItem(storageKeyName, "inactive");
            }

        }

        // /////////////////////////
        //  reject all vendors too
        // /////////////////////////
        await toggleVendors(false);

        // /////////////////////////
        // SEND DATA / get response
        // /////////////////////////
        const response = await sendDataIfAllowed(sendTheseRecordsToOneTrust, "Preference Center - Reject All");

        // store @ disk the date we last consented. We'll use this later in ShouldShowBanner() logic.
        await updateLastConsentDate();

        triggerConsentEv();

        // returns a promise, which resolves to this data value
        return response;


    } catch (error) {
        throw error;

    }

}

const preferenceCenterClose = async () => {

    try {

        // Clear any previously saved items.
        clearVendorListSaveQueue();
        clearPreferenceCenterSaveQueue();

        return;

    } catch (error) {
        throw error;

    }

}




function clearOTSDKData() {
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const keyName = localStorage.key(i);
        if (keyName.startsWith("OneTrust_") || keyName.startsWith("IABTCF_")) {
            localStorage.removeItem(keyName);
        }
    }
    localStorage.removeItem("IABUSPrivacy_String");
}

function getConsentStatus(CustomGroupId) {

    try {

        const consentRecords = getPurposesList();

        for (const recordID in consentRecords) {
            const record = consentRecords[recordID];
            if (record.CustomGroupId === CustomGroupId) {
                return record["Status"].toString();
            }
        }

        return "UNKNOWN";

    } catch (error) {
        throw error

    }

}

const downloadGoogleVendorList = async () => {
    try {
        const sdkData = getOTSDKData();

        // Make Sure We Have Data To Work With
        if (!sdkData) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }
        // ///////////////////////////////////////////////
        // I only need the vendor list if IAB2
        // ///////////////////////////////////////////////
        if (!isIAB2()) {
            return { "info": "not IAB2 - vendor list not needed" };
        }

        const mobileData = sdkData["culture"]["MobileData"]["preferenceCenterData"]["googleVendors"]["general"];
        if(!mobileData.show){
            OTSDK_logger("downloadGoogleVendorList -> Google vendor is not enabled for this template");
            return;
        }

        const GoogleData = sdkData["domain"]["GoogleData"];
        if (!GoogleData) {
            OTSDK_logger("downloadGoogleVendorList -> MISSING GoogleData NODE FROM getOTSDKData");
            return;
        }

        const googleVendorListUrl = GoogleData["googleVendorListUrl"];
        if (!googleVendorListUrl) {
            OTSDK_logger("downloadGoogleVendorList -> MISSING googleVendorListUrl NODE FROM IabV2Data node");
            return;
        }

        // /////////////////////////
        // GET DATA
        // /////////////////////////

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("cache-control", "no-cache");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const performanceMetric3Start = Date.now();
        const response = await fetch(googleVendorListUrl, requestOptions)
            .catch(error => {
                throw error;
            });

        // check if response worked (no 404 errors etc...)
        if (!response.ok) {
            OTSDK_logger("response.statusText -> " + response.statusText);
            throw new Error(response.statusText);
        }

        // convert response to JSON object
        const data = await response.json();
        OTSDK_performance_logger(3,performanceMetric3Start, Date.now());
        const domainData = sdkData["culture"]["DomainData"];
        const vendorConsentModel = domainData["VendorConsentModel"];
        const overriddenVendors = domainData["OverridenGoogleVendors"];
        const defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out") ? true : false;  // opt-out = ON by default
        const vendorConsentUserSelections = getSavedGoogleVendorConsents();
        const vendorRecords = data["vendors"];
        const vendorKeys = Object.keys(vendorRecords);
        for (let i=0; i < vendorKeys.length; i++) {
            const vendorRecord = vendorRecords[vendorKeys[i]];
            const vendorID = vendorRecord["id"];
            // ////////////////////////////////////////
            // set the defaults
            vendorRecord["shouldShowVendor"] = true;
            vendorRecord["shouldShowConsentToggleForVendor"] = true;
            vendorRecord["vendorConsentToggleIsOn"] = defaultConsentStatus;
            vendorRecord["purposes"] = [];
            vendorRecord["legIntPurposes"] = [];
            vendorRecord["specialPurposes"] = [];
            vendorRecord["features"] = [];
            vendorRecord["specialFeatures"] = [];
            const overriddenVendorRecord = overriddenVendors[vendorID];
            if (overriddenVendorRecord) {

                // should show vendor override
                vendorRecord["shouldShowVendor"] = overriddenVendorRecord["active"];
            }

            // set the vendor consent status
            if (vendorConsentUserSelections.hasOwnProperty(vendorID)) {
                vendorRecord["vendorConsentToggleIsOn"] = vendorConsentUserSelections[vendorID];
            }
            vendorRecord["UIState_vendorConsentToggleIsOn"] = vendorRecord["vendorConsentToggleIsOn"];
        }

        // ////////////////////////////////////////
        // save the results to disk
        // ////////////////////////////////////////
        localStorage.setItem("OneTrust_Google_VendorList", JSON.stringify(data));

        // ////////////////////////////////////////
        // returns a promise, which resolves to this data value
        // ////////////////////////////////////////
        return data;

    } catch (error) {
        throw error;

    }
};


const downloadVendorList = async () => {

    try {
        const sdkData = getOTSDKData();

        // Make Sure We Have Data To Work With
        if (!sdkData) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }


        // ///////////////////////////////////////////////
        // I only need the vendor list if IAB2
        // ///////////////////////////////////////////////
        if (!isIAB2()) {
            return { "info": "not IAB2 - vendor list not needed" };
        }


        // ///////////////////////////////////////////////
        // make sure I have the data I need
        // ///////////////////////////////////////////////

        const IabV2Data = sdkData["domain"]["IabV2Data"];
        if (!IabV2Data) {
            throw "MISSING IabV2Data NODE FROM getOTSDKData";
        }

        const globalVendorListUrl = IabV2Data["globalVendorListUrl"];
        if (!globalVendorListUrl) {
            throw "MISSING globalVendorListUrl NODE FROM IabV2Data node";
        }


        // /////////////////////////
        // GET DATA
        // /////////////////////////

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("cache-control", "no-cache");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const performanceMetric2Start = Date.now();
        const response = await fetch(globalVendorListUrl, requestOptions)
            .catch(error => {
                throw error;
            });

        // check if response worked (no 404 errors etc...)
        if (!response.ok) {
            OTSDK_logger("response.statusText -> " + response.statusText);
            throw new Error(response.statusText);
        }

        // convert response to JSON object
        const data = await response.json();
        OTSDK_performance_logger(2,performanceMetric2Start, Date.now());

        // /////////////////////////////////////
        // ENHANCE THE DATA FOR USE IN UI
        // ////////////////////////////////////////
        const domainData = sdkData["culture"]["DomainData"];
        const overriddenVendors = domainData["OverriddenVendors"];
        const vendorConsentModel = domainData["VendorConsentModel"];
        const defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out") ? true : false;  // opt-out = ON by default


        const vendorConsentUserSelections = getSavedVendorConsents();
        const vendorLIUserSelections = getSavedVendorLegitInterest();

        const PublisherRestrictions = domainData["publisher"]["restrictions"];
        const organizedPublisherRestrictions = organizePublisherRestrictionsForQuickLookupByVendor(PublisherRestrictions);

        const syncGroupId = sdkData["domain"]["SyncGroupId"];
        const dataFetch = sdkData["profile"]["fetch"];
        var vendorConsentsArr = null;
        var vendorLIArr = null;
        if(dataFetch.hasOwnProperty("syncGroups") && dataFetch["syncGroups"].hasOwnProperty(syncGroupId) && !getConsentExpired()){
            const syncGroups = dataFetch["syncGroups"][syncGroupId];
            const vendorConsents = syncGroups["tcStringV2Decoded"]["vendor"]["consents"];
            const vendorLegitimate = syncGroups["tcStringV2Decoded"]["vendor"]["legitimateInterests"];
            vendorConsentsArr = vendorConsents.split("");
            vendorLIArr = vendorLegitimate.split("");
        }


        var maxVendorID = 0;
        const vendorRecords = data["vendors"];
        const vendorKeys = Object.keys(vendorRecords);
        for (var i=0;i < vendorKeys.length;i++) {

            const vendorRecord = vendorRecords[vendorKeys[i]];
            const vendorID = vendorRecord["id"];

            // save this value for later use in building TCF strings.
            if (vendorID > maxVendorID) {
                maxVendorID = vendorID;
            }

            // ////////////////////////////////////////
            // set the defaults
            vendorRecord["shouldShowVendor"] = true;
            vendorRecord["shouldShowConsentToggleForVendor"] = vendorRecord.purposes.length > 0;
            vendorRecord["vendorConsentToggleIsOn"] = defaultConsentStatus;
            vendorRecord["shouldShowLegitimateInterestToggleForVendor"] = vendorRecord.legIntPurposes.length > 0;
            vendorRecord["vendorLegitimateInterestToggleIsOn"] = true;

            // ////////////////////////////////////////
            // override defaults based on overridden Vendor rules...
            // ////////////////////////////////////////

            const overriddenVendorRecord = overriddenVendors[vendorID];
            if (overriddenVendorRecord) {

                // should show vendor override
                vendorRecord["shouldShowVendor"] = overriddenVendorRecord["active"];
                // should update the consent and legint from the overriden values
                vendorRecord["shouldShowConsentToggleForVendor"] = overriddenVendorRecord["consent"];
                vendorRecord["shouldShowLegitimateInterestToggleForVendor"] = overriddenVendorRecord["legInt"];
            }


            // ////////////////////////////////////////
            // override defaults based on publisher restrictions rules...
            // ////////////////////////////////////////
            // if restriction type = 0 , remove purpose id from LI and Purpose
            // if restriction type = 1 , move purpose id from LI to Purpose
            // if restriction type = 2 , move purpose id from Purpose to LI
            const strVendorID = vendorID.toString();
            if (organizedPublisherRestrictions.hasOwnProperty(strVendorID)) {


                // purposeIDsToRemove
                organizedPublisherRestrictions[strVendorID]['0'].forEach(function (purposeID) {
                    data["vendors"][strVendorID]['purposes'] = data["vendors"][strVendorID]['purposes'].filter(function (item) { return item !== purposeID });
                    data["vendors"][strVendorID]['legIntPurposes'] = data["vendors"][strVendorID]['legIntPurposes'].filter(function (item) { return item !== purposeID });
                });

                // purposeIDs_move_LI_to_Purpose
                organizedPublisherRestrictions[strVendorID]['1'].forEach(function (purposeID) {
                    if (data["vendors"][strVendorID]['legIntPurposes'].indexOf(purposeID) >= 0) {
                        data["vendors"][strVendorID]['purposes'] = data["vendors"][strVendorID]['purposes'].filter(function (item) { return item !== purposeID });
                        data["vendors"][strVendorID]['legIntPurposes'] = data["vendors"][strVendorID]['legIntPurposes'].filter(function (item) { return item !== purposeID });
                        data["vendors"][strVendorID]['purposes'].push(purposeID);
                        data["vendors"][strVendorID]['purposes'] = data["vendors"][strVendorID]['purposes'].sort();
                    }
                });

                // purposeIDs_move_Purpose_to_LI
                organizedPublisherRestrictions[strVendorID]['2'].forEach(function (purposeID) {
                    if (data["vendors"][strVendorID]['purposes'].indexOf(purposeID) >= 0) {
                        data["vendors"][strVendorID]['purposes'] = data["vendors"][strVendorID]['purposes'].filter(function (item) { return item !== purposeID });
                        data["vendors"][strVendorID]['legIntPurposes'] = data["vendors"][strVendorID]['legIntPurposes'].filter(function (item) { return item !== purposeID });
                        data["vendors"][strVendorID]['legIntPurposes'].push(purposeID);
                        data["vendors"][strVendorID]['legIntPurposes'] = data["vendors"][strVendorID]['legIntPurposes'].sort();
                    }
                });

            }




            // ////////////////////////////////////////
            // get the sate for the toggles
            // ////////////////////////////////////////

            // set the vendor consent status
            if (vendorRecord.shouldShowVendor && vendorConsentUserSelections.hasOwnProperty(vendorID)) {
                vendorRecord["vendorConsentToggleIsOn"] = vendorConsentUserSelections[vendorID];
            }


            // set the vendor LI consent status
            if (vendorRecord.shouldShowVendor && vendorLIUserSelections.hasOwnProperty(vendorID)) {
                vendorRecord["vendorLegitimateInterestToggleIsOn"] = vendorLIUserSelections[vendorID];
            }


            // if we not to show the toggles, also turn them off.
            if (!vendorRecord.shouldShowConsentToggleForVendor && vendorRecord.vendorConsentToggleIsOn) {
                vendorRecord["vendorConsentToggleIsOn"] = false;
            }

            if (!vendorRecord.shouldShowLegitimateInterestToggleForVendor && vendorRecord.vendorLegitimateInterestToggleIsOn) {
                vendorRecord["vendorLegitimateInterestToggleIsOn"] = false;
            }

            // all toggles should be off if we're not to show the vendor
            if (!vendorRecord["shouldShowVendor"]) {
                vendorRecord["vendorConsentToggleIsOn"] = false;
                vendorRecord["vendorLegitimateInterestToggleIsOn"] = false;
                vendorRecord["shouldShowConsentToggleForVendor"] = false;
                vendorRecord["shouldShowLegitimateInterestToggleForVendor"] = false;
            }

            const id = parseInt(vendorID) - 1;
            if(vendorConsentsArr !== null){
                if(vendorConsentsArr.length === 0){
                    vendorRecord["vendorConsentToggleIsOn"] = false;
                }
                else{
                    vendorRecord["vendorConsentToggleIsOn"] = getStatus(vendorConsentsArr[id]);
                }
            }

            if(vendorLIArr !== null){
                if(vendorLIArr.length === 0){
                    vendorRecord["vendorLegitimateInterestToggleIsOn"] = false;
                }
                else{
                    vendorRecord["vendorLegitimateInterestToggleIsOn"] = getStatus(vendorLIArr[id]);
                }
            }

            // MOB-6304
            vendorRecord["UIState_vendorConsentToggleIsOn"] = vendorRecord["vendorConsentToggleIsOn"];
            vendorRecord["UIState_vendorLegitimateInterestToggleIsOn"] = vendorRecord["vendorLegitimateInterestToggleIsOn"];

        }



        // ////////////////////////////////////////
        // save the results to disk
        // ////////////////////////////////////////
        localStorage.setItem("OneTrust_VendorList", JSON.stringify(data));
        localStorage.setItem("OneTrust_VendorList_maxVendorID", maxVendorID);
        localStorage.setItem("OneTrust_vendorList_Date", (new Date().getTime() / 1000).toString());

        // ////////////////////////////////////////
        // returns a promise, which resolves to this data value
        // ////////////////////////////////////////
        return data;


    } catch (error) {
        throw error;

    }

}

function getStatus(a){
    if(a === "1"){
        return true;
    }
    return false;
}

const downloadStorageDisclosure = async (url) => {
    try {
        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }
        // ///////////////////////////////////////////////
        // I only need to call this api if it's IAB2
        // ///////////////////////////////////////////////
        if (!isIAB2()) {
            return { "info": "Supported only for IAB2" };
        }
        // /////////////////////////
        // GET DATA
        // /////////////////////////
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("cache-control", "no-cache"); // <-- some server not allowing this.

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(url, requestOptions)
            .catch(error => {
                throw error;
            });
        // // check if response worked (no 404 errors etc...)
        // console.log('... response', response);
        
        // if (!response.ok) {
        //     OTSDK_logger("response.statusText -> " + response.statusText);
        //     throw new Error(response.statusText);
        // }
    
        const error = (response) => {
            if(response && response.statusText){
              OTSDK_logger("response.statusText -> " + response.statusText);
              //throw new Error(response.statusText);
            }else{
              OTSDK_logger("response.statusText ->  Error downloading vendor storage disclosure");
              //throw new Error('downloading vendor storage disclosure');
            }
            //OTSDK_logger("response.status -> " + response.status);
            return {'code': 'err'};
        }

        //console.log(response.headers.get('Content-Type'));
        // convert response to JSON object
        const data = await (response.status > 400 || response.headers.get('Content-Type') !== 'application/json') ?  error() : response.json();

        // ////////////////////////////////////////
        // returns a promise, which resolves to this data value
        // ////////////////////////////////////////
        return data;
    } catch (error) {
        throw error;
    }
}


function getGoogleVendorList() {
    const answer = localStorage.getItem("OneTrust_Google_VendorList");
    if (!answer) {
        return {};
    }
    return JSON.parse(answer);
}

function getVendorList() {
    const answer = localStorage.getItem("OneTrust_VendorList");
    if (!answer) {
        return {};
    }
    return JSON.parse(answer);
}

function getVendorDetails(vendorID) {
    return getVendorList()['vendors'][vendorID.toString()];
}

function getSavedVendorConsents() {
    const answer = localStorage.getItem("OneTrust_vendorConsentUserSelections");
    if (!answer) {
        return {};
    }
    return JSON.parse(answer);
}

function getSavedGoogleVendorConsents() {
    const answer = localStorage.getItem("OneTrust_vendorGoogleConsentUserSelections");
    if (!answer) {
        return {};
    }
    return JSON.parse(answer);
}

function getSavedVendorLegitInterest() {
    const answer = localStorage.getItem("OneTrust_vendorLIUserSelections");
    if (!answer) {
        return {};
    }
    return JSON.parse(answer);
}

function toggleVendorsConsentUi(isEnabled, vendorIDs = null) {
    try {
        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }
        const vendorListObject = getVendorList();
        if (!vendorListObject || !vendorListObject.vendors) { return; } //<- wont have vendors if not IAB2

        const otsdk_saveQueue = [];

        if (vendorIDs){

            // loop through each vendor id passed into this function.
            for (let itemID in vendorIDs) {
                const vendorId = vendorIDs[itemID];
                const vendorRecord = vendorListObject.vendors[vendorId];
                if (vendorRecord && vendorRecord.shouldShowConsentToggleForVendor) {
                    vendorRecord["UIState_vendorConsentToggleIsOn"] = isEnabled;
                    otsdk_saveQueue.push({ "vendorId": vendorId, "newValue": isEnabled });
                }
            }

        }else{

            // loop through each vendor record
            for (const vendorId in vendorListObject.vendors) {
                const vendorRecord = vendorListObject.vendors[vendorId];
                if (vendorRecord.shouldShowConsentToggleForVendor) {
                    vendorRecord["UIState_vendorConsentToggleIsOn"] = isEnabled;
                    otsdk_saveQueue.push({ "vendorId": vendorId, "newValue": isEnabled });
                }
            }

        }


        localStorage.setItem("OneTrust_VendorList", JSON.stringify(vendorListObject));
        localStorage.setItem("OneTrust_saveQueue_vendor", JSON.stringify(otsdk_saveQueue));

    } catch (error) {
        throw error;
    }
}

const toggleVendors = async (isEnabled) => {
    try {
        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        clearVendorListSaveQueue();

        // ///////////////////////////////////////////////
        // PREPARE THE DATA
        // ///////////////////////////////////////////////
        var vendorListObject = getVendorList();
        if (!vendorListObject || !vendorListObject.vendors) { return; } //<- wont have vendors if not IAB2

        var vendorConsentUserSelections = getSavedVendorConsents();
        var vendorLIUserSelections = getSavedVendorLegitInterest();

        var vendorRecords = vendorListObject["vendors"];
        for (var vendorID in vendorRecords) {
            var vendorRecord = vendorRecords[vendorID];
            // set value for Consent
            if (vendorRecord.shouldShowConsentToggleForVendor) {
                vendorConsentUserSelections[vendorID] = isEnabled;
                vendorRecord["vendorConsentToggleIsOn"] = isEnabled;
            }

            // set value for Legitimate Interest
            if (vendorRecord.shouldShowLegitimateInterestToggleForVendor) {
                vendorLIUserSelections[vendorID] = isEnabled;
                vendorRecord["vendorLegitimateInterestToggleIsOn"] = isEnabled;
            }

            // MOB-6304
            vendorRecord["UIState_vendorConsentToggleIsOn"] = vendorRecord["vendorConsentToggleIsOn"];
            vendorRecord["UIState_vendorLegitimateInterestToggleIsOn"] = vendorRecord["vendorLegitimateInterestToggleIsOn"];
        }
        // ///////////////////////////////////////////////
        // SAVE THE DATA TO LOCAL STORAGE
        // ///////////////////////////////////////////////
        localStorage.setItem("OneTrust_vendorConsentUserSelections", JSON.stringify(vendorConsentUserSelections));
        localStorage.setItem("OneTrust_vendorLIUserSelections", JSON.stringify(vendorLIUserSelections));
        localStorage.setItem("OneTrust_VendorList", JSON.stringify(vendorListObject));

        var vendorGoogleListObject = getGoogleVendorList();
        if (vendorGoogleListObject && vendorGoogleListObject.vendors) {
            var googlevendorConsentUserSelections = getSavedGoogleVendorConsents();
            var googlevendorRecords = vendorGoogleListObject["vendors"];
            for (var vendorID in googlevendorRecords) {
                var vendorRecord = googlevendorRecords[vendorID];
                // set value for Consent
                if (vendorRecord.shouldShowConsentToggleForVendor) {
                    googlevendorConsentUserSelections[vendorID] = isEnabled;
                    vendorRecord["vendorConsentToggleIsOn"] = isEnabled;
                }
                vendorRecord["UIState_vendorConsentToggleIsOn"] = vendorRecord["vendorConsentToggleIsOn"];
            }
            localStorage.setItem("OneTrust_vendorGoogleConsentUserSelections", JSON.stringify(googlevendorConsentUserSelections));
            localStorage.setItem("OneTrust_Google_VendorList", JSON.stringify(vendorGoogleListObject));
         }

        // since we changed vendors, we'll need to rebuild the TCF strig
        writeTCString();

        // convert response to JSON object
        const data = await getVendorListData();

        // ///////////////////////////////////////////////
        // returns a promise, which resolves to this data value
        // ///////////////////////////////////////////////
        return data;

    } catch (error) {
        throw error;
    }
}

function updateVendorConsent(vendorId, boolConsentValue) {

    try {


        var otsdk_saveQueue = [];

        // if we already have a queue @ disk, use it.
        var otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue_vendor");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        // remove any dups
        for (var i = 0; i < otsdk_saveQueue.length; i++) {
            if (otsdk_saveQueue[i].vendorId === vendorId) {
                otsdk_saveQueue.splice(i, 1);
                i--;
            }
        }

        // add to the save queue
        otsdk_saveQueue.push({ "vendorId": vendorId, "newValue": boolConsentValue });

        // MOB-6304 - update the vendor list object
        const vendorListObject = getVendorList();
        if(vendorListObject['vendors'][vendorId.toString()] != undefined){
            vendorListObject['vendors'][vendorId.toString()]['UIState_vendorConsentToggleIsOn'] = boolConsentValue;
            localStorage.setItem("OneTrust_VendorList", JSON.stringify(vendorListObject));
        }else{
            const googleVendorListObject = getGoogleVendorList();
            googleVendorListObject['vendors'][vendorId.toString()]['UIState_vendorConsentToggleIsOn'] = boolConsentValue;
            localStorage.setItem("OneTrust_Google_VendorList", JSON.stringify(googleVendorListObject));
        }


        // write the queue to disk
        localStorage.setItem("OneTrust_saveQueue_vendor", JSON.stringify(otsdk_saveQueue));


    } catch (error) {
        throw error;

    }

}


function updateVendorLegitInterest(vendorId, boolConsentValue) {

    try {

        var otsdk_saveQueue = [];

        // if we already have a queue @ disk, use it.
        var otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue_vendor_li");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        // remove any dups
        for (var i = 0; i < otsdk_saveQueue.length; i++) {
            if (otsdk_saveQueue[i].vendorId === vendorId) {
                otsdk_saveQueue.splice(i, 1);
                i--;
            }
        }

        // add to the save queue
        otsdk_saveQueue.push({ "vendorId": vendorId, "newValue": boolConsentValue });

        // MOB-6304 - update the vendor list object
        const vendorListObject = getVendorList();
        vendorListObject['vendors'][vendorId.toString()]['UIState_vendorLegitimateInterestToggleIsOn'] = boolConsentValue;
        localStorage.setItem("OneTrust_VendorList", JSON.stringify(vendorListObject));


        // write the queue to disk
        localStorage.setItem("OneTrust_saveQueue_vendor_li", JSON.stringify(otsdk_saveQueue));


    } catch (error) {
        throw error;

    }

}

const vendorsSaveChanges = async () => {

    try {

        // Make Sure We Have Data To Work With
        if (!getOTSDKData()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }



        // ///////////////////////////////////////////////
        // Get the data I'll need
        // ///////////////////////////////////////////////

        var vendorListObject = getVendorList();
        if (!vendorListObject || !vendorListObject.vendors) { return; } //<- wont have vendors if not IAB2

        var vendorRecords = vendorListObject["vendors"];
        var vendorConsentUserSelections = getSavedVendorConsents();
        var vendorLIUserSelections = getSavedVendorLegitInterest();

        var vendorGoogleListObject = getGoogleVendorList();

        // ///////////////////////////////////////////////
        // process the vendor consent queue
        // ///////////////////////////////////////////////

        // Get the save queue from disk
        var otsdk_saveQueue = [];
        var otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue_vendor");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        // update local storage and the vendor list
        for (const keyName in otsdk_saveQueue) {
            var record = otsdk_saveQueue[keyName];
            if (record) {
                var vendorId = record["vendorId"];
                vendorConsentUserSelections[vendorId] = record["newValue"];
                if(vendorRecords[vendorId]){
                vendorRecords[vendorId]["vendorConsentToggleIsOn"] = record["newValue"];

                // MOB-6304
                vendorRecords[vendorId]["UIState_vendorConsentToggleIsOn"] = record["newValue"];
                }

            }
        }

        if (vendorGoogleListObject && vendorGoogleListObject.vendors) {
            var googlevendorConsentUserSelections = getSavedGoogleVendorConsents();
            var googlevendorRecords = vendorGoogleListObject["vendors"];
            // update local storage and the vendor list
            for (const keyName in otsdk_saveQueue) {
                var record = otsdk_saveQueue[keyName];
                if (record) {
                    var vendorId = record["vendorId"];
                    if(googlevendorRecords[vendorId]){
                    googlevendorConsentUserSelections[vendorId] = record["newValue"];
                    googlevendorRecords[vendorId]["vendorConsentToggleIsOn"] = record["newValue"];

                    // // MOB-6304
                    googlevendorRecords[vendorId]["UIState_vendorConsentToggleIsOn"] = record["newValue"];
                    }
                }
            }
        }

        // ///////////////////////////////////////////////
        // process the vendor LI consent queue
        // ///////////////////////////////////////////////

        // Get the save queue from disk
        otsdk_saveQueue = [];
        otsdk_saveQueue_str = localStorage.getItem("OneTrust_saveQueue_vendor_li");
        if (otsdk_saveQueue_str && otsdk_saveQueue_str.length > 0) {
            otsdk_saveQueue = JSON.parse(otsdk_saveQueue_str);
        }

        // update local storage and the vendor list
        for (const keyName in otsdk_saveQueue) {
            var record = otsdk_saveQueue[keyName];
            if (record) {
                var vendorId = record["vendorId"];
                vendorLIUserSelections[vendorId] = record["newValue"];
                vendorRecords[vendorId]["vendorLegitimateInterestToggleIsOn"] = record["newValue"];

                // MOB-6304
                vendorRecords[vendorId]["UIState_vendorLegitimateInterestToggleIsOn"] = record["newValue"];
            }
        }


        // ///////////////////////////////////////////////
        // Save updates to disk
        // ///////////////////////////////////////////////

        localStorage.setItem("OneTrust_VendorList", JSON.stringify(vendorListObject));
        localStorage.setItem("OneTrust_vendorLIUserSelections", JSON.stringify(vendorLIUserSelections));
        localStorage.setItem("OneTrust_vendorConsentUserSelections", JSON.stringify(vendorConsentUserSelections));
        localStorage.setItem("OneTrust_saveQueue_vendor", JSON.stringify([]));
        localStorage.setItem("OneTrust_saveQueue_vendor_li", JSON.stringify([]));

        localStorage.setItem("OneTrust_Google_VendorList", JSON.stringify(vendorGoogleListObject));
        localStorage.setItem("OneTrust_vendorGoogleConsentUserSelections", JSON.stringify(googlevendorConsentUserSelections));



        // since we changed vendors, we'll need to rebuild the TCF strig
        writeTCString();


        // ///////////////////////////////////////////////
        // return the latest vendor consent profile
        // ///////////////////////////////////////////////

        const data = await getVendorListData();
        return data;


    } catch (error) {
        throw error;
    }

}

function getVendorListData() {

    try {

        if (!getVendorList()) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        var vendorListObject = getVendorList();
        var vendorRecords = vendorListObject["vendors"];
        var answer = {}

        for (var vendorID in vendorRecords) {

            var vendorRecord = vendorRecords[vendorID];
            var shouldShowVendor = vendorRecord["shouldShowVendor"];
            var vendorConsentToggleIsOn = vendorRecord["vendorConsentToggleIsOn"]
            var vendorLegitimateInterestToggleIsOn = vendorRecord["vendorLegitimateInterestToggleIsOn"]
            var shouldShowLegitimateInterestToggleForVendor = vendorRecord["shouldShowLegitimateInterestToggleForVendor"]
            var shouldShowConsentToggleForVendor = vendorRecord["shouldShowConsentToggleForVendor"]

            var record = {
                "vendorID": vendorID,
                "shouldShowVendor": shouldShowVendor,
                "shouldShowConsentToggleForVendor": shouldShowConsentToggleForVendor,
                "vendorConsentToggleIsOn": vendorConsentToggleIsOn,
                "shouldShowLegitimateInterestToggleForVendor": shouldShowLegitimateInterestToggleForVendor,
                "vendorLegitimateInterestToggleIsOn": vendorLegitimateInterestToggleIsOn,
                "UIState_vendorConsentToggleIsOn": vendorRecord["vendorConsentToggleIsOn"],
                "UIState_vendorLegitimateInterestToggleIsOn": vendorRecord["vendorLegitimateInterestToggleIsOn"]
            };

            answer[vendorID] = record;
        }

        return answer;

    } catch (error) {
        throw error

    }

}


function clearPreferenceCenterSaveQueue() {
    localStorage.setItem("OneTrust_saveQueue", JSON.stringify([]));
}

function clearVendorListSaveQueue() {
    localStorage.setItem("OneTrust_saveQueue_vendor", JSON.stringify([]));
    localStorage.setItem("OneTrust_saveQueue_vendor_li", JSON.stringify([]));
}



// export const OTSDK_getTcString = async () => {
//
//     try {
//
//         // Make Sure We Have Data To Work With
//         if (!getOTSDKData()) {
//             throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
//         }
//         const data = getOTSDKData();
//         const syncGroup = data["domain"]["SyncGroupId"];
//         return data["profile"]["fetch"]["syncGroups"][syncGroup]["tcStringV2"];
//
//     } catch (error) {
//         throw "tcStringV2 not found";
//
//     }
//
// }


function writeTCString() {

    try {
        const sdkData = getOTSDKData();
        // ///////////////////////////////////////////////
        // Make Sure We Have Data To Work With
        // ///////////////////////////////////////////////
        if (!sdkData) {
            throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
        }

        // we only create string for IABv2
        if (!isIAB2()) {
            return '';
        }

        // ///////////////////////////////////////////////
        // make sure I have the data I need
        // ///////////////////////////////////////////////

        const OneTrust_sdk_keys = JSON.parse(atob(localStorage.getItem("OneTrust_sdk_keys")));

        const IabV2Data = sdkData["domain"]["IabV2Data"];
        if (!IabV2Data) {
            throw "MISSING IabV2Data NODE FROM getOTSDKData";
        }

        const globalVendorListUrl = IabV2Data["globalVendorListUrl"];
        if (!globalVendorListUrl) {
            throw "MISSING globalVendorListUrl NODE FROM IabV2Data node";
        }

        const vendorList = getVendorList();
        if (!vendorList) {
            // if I have what I need, should I just try to download it again?
            throw "MISSING localStorage.OneTrust_VendorList";
        }


        const OneTrust_VendorList_maxVendorID = localStorage.getItem("OneTrust_VendorList_maxVendorID");
        if (!OneTrust_VendorList_maxVendorID) {
            throw "MISSING localStorage.OneTrust_VendorList_maxVendorID";
        }


        const iabPayload = {};
        const updatedTime = IabV2Data["updatedTime"];

        // Meta Data
        iabPayload["Version"] = 2; //Version number of the encoding format - the value is 2 for IAB 2.0.
        iabPayload["Created"] = new Date();

        if (updatedTime != null) {
            iabPayload["Created"] = new Date(updatedTime + 'Z');
        }

        iabPayload["LastUpdated"] = new Date();
        iabPayload["CmpId"] = IabV2Data["cmpId"];
        iabPayload["CmpVersion"] = IabV2Data["cmpVersion"];
        iabPayload["ConsentScreen"] = IabV2Data["consentScreen"];
        iabPayload["ConsentLanguage"] = OneTrust_sdk_keys["languageCode"];
        iabPayload["PublisherCC"] = sdkData["domain"]["PublisherCC"]; //"UK";
        iabPayload["VendorListVersion"] = getVendorList()["vendorListVersion"];
        iabPayload["TcfPolicyVersion"] = getVendorList()["tcfPolicyVersion"];

        // Purposes & Special Features
        iabPayload["PurposesConsent"] = getValuesForTCFFromConsentProfile('IAB2_PURPOSE', 'Status');
        iabPayload["PurposesLITransparency"] = getValuesForTCFFromConsentProfile('IAB2_PURPOSE', 'LI'); // new Array(3, 4, 5, 8, 9, 10);
        iabPayload["SpecialFeatureOptins"] = getValuesForTCFFromConsentProfile('IAB2_SPL_FEATURE', 'Status');

        // Vendors
        iabPayload["VendorConsents"] = getVendorConsentsArrayForTCF();  //new array(2, 3, 6, 7, 8, 10, 12, 13, 14, 15, 16, 21, 25, 27, 30, 31, 34, 35, 37, 38, 39, 42, 43, 49, 52, 54, 55, 56, 57, 59, 60, 63, 64, 65, 66, 67, 68, 69, 73, 74, 76, 78, 83, 86, 87, 89, 90, 92, 96, 99, 100, 106, 109, 110, 114, 115);
        iabPayload["VendorLegitimateInterest"] = getVendorLiArrayForTCF(); //new array(1, 9, 26, 27, 30, 36, 37, 43, 86, 97, 110, 113);

        iabPayload["OOBVendorsAllowed"] = []; // since this is an app, we might not need this.... but what about cross decice?
        iabPayload["DisclosedVendors"] = []; // since this is an app, we might not need this.... but what about cross decice?
        iabPayload["AllowedVendors"] = []; // since this is an app, we might not need this.... but what about cross decice?


        //// Custom Purposes
        iabPayload["NumCustomPurposes"] = 0;
        iabPayload["CustomPurposesConsent"] = []; // NOT YET SUPPORTED, JUST PASS AN EMPTY ARRAY FOR NOW
        iabPayload["CustomPurposesLITransparency"] = []; // NOT YET SUPPORTED, JUST PASS AN EMPTY ARRAY FOR NOW

        // Special Flags
        iabPayload["PurposeOneTreatment"] = getPurposeOneTreatment();
        iabPayload["IsServiceSpecific"] = 1; // global = 0,  1 = service-specific storage
        iabPayload["UseNonStandardStacks"] = 0;

        // Other
        iabPayload["gdprApplies"] = 1;

        //PublisherRestrictions
        iabPayload["PublisherRestrictions"] = sdkData["culture"]["DomainData"]["publisher"]["restrictions"];

        // when we downloaded the vendor list on init, we had to loop through them - we grabbed the max id and stored to disk.
        iabPayload["maxVendorIDFromVendorList"] = parseInt(OneTrust_VendorList_maxVendorID);

        // create the strings
        const core = createTCFCoreString(iabPayload);
        const publisherTC = createTCFPublisherTC(iabPayload);

        // since this is an app, and not a global scope cookie all we need is the core string and publisher tc
        const encodedString = core + "." + publisherTC;

        // save the string to disk
        localStorage.setItem("IABTCF_TCString", encodedString);

        // write the cookie
        writeTCStringCookie(encodedString);

        OTSDK_logger("TC String ->" + encodedString);

        // Compute IABTCF_AddtlConsent String  - MOB-8233
        writeIABTCF_AddtlConsent();


        // return the answer
        return encodedString;


    } catch (error) {
        throw error;

    }

}

function writeCCPAString() {


    const ccpaData = getOTSDKData()["culture"]["MobileData"]["ccpaData"];

    // look for reasons NOT to write the string
    if (ccpaData == null) { return; }
    if (!ccpaData.hasOwnProperty("parentCCPACategory")) { return; }
    if (!ccpaData.hasOwnProperty("ccpaExpNotice")) { return; }
    if (!ccpaData.hasOwnProperty("computeCCPA")) { return; }
    if (!ccpaData["computeCCPA"]) { return; }

    // look for reasons NOT to write the string
    const savedProfile = getPurposesList();
    if (savedProfile.length === 0) { return; }


    let ccpaString = "1---";
    let consent_status = getConsentStatus(ccpaData["parentCCPACategory"]);

    ccpaString = "1";
    ccpaString += ccpaData["ccpaExpNotice"] === true ? "Y" : "N"; // ccpaExpNotice
    ccpaString += consent_status === "inactive" ? "Y" : "N";  // opt out sale
    ccpaString += ccpaData["ccpaLspa"] === true ? "Y" : "N";  // Limited Service Provider Agreement

    localStorage.setItem("IABUSPrivacy_String", ccpaString);

    return ccpaString

}


function writeIABTCF_AddtlConsent() {

    // Compute IABTCF_Additional Consent String for Google Vendors  - MOB-8233

    try {

        // Make Sure We Have Data To Work With
        const sdkData = getOTSDKData();
        if (!sdkData) { return; }

        // we only create string for IABv2
        if (!isIAB2()) { return; }

        // check to make sure we should really build the string?
        const mobileData = sdkData["culture"]["MobileData"]["preferenceCenterData"]["googleVendors"]["general"];
        if(!mobileData.show){
            OTSDK_logger("IABTCF_AddtlConsent ->" + "Google vendor is not enabled for this template");
            return;
        }

        // build the string
        const googleVendorConsentUserSelections = getSavedGoogleVendorConsents();
        let encodedString = "1~";
        for (let vendorID in googleVendorConsentUserSelections) {
           if (googleVendorConsentUserSelections.hasOwnProperty(vendorID) && googleVendorConsentUserSelections[vendorID]){
                encodedString = encodedString + "." + vendorID.toString();
            }
        }

        // store the string to disk
        localStorage.setItem("IABTCF_AddtlConsent", encodedString);

        // logging
        OTSDK_logger("IABTCF_AddtlConsent ->" + encodedString);

    } catch (error) {
        OTSDK_logger("IABTCF_AddtlConsent ->" + error.toString());

    }

}


function getBannerData() {
    const sdkData = getOTSDKData();
    const bannerData = {};
    if (!sdkData || (Object.keys(sdkData).length === 0)) {
        return bannerData;
    }
    const domainData = sdkData.culture.DomainData;
    const commonData = sdkData.culture.CommonData;
    const mobileData = sdkData.culture.MobileData;
    bannerData.BannerTitle = domainData.BannerTitle;
    bannerData.AlertNoticeText = domainData.AlertNoticeText;
    bannerData.OptanonLogo = commonData.OptanonLogo;
    bannerData.ShowBannerAcceptButton = commonData.ShowBannerAcceptButton;
    bannerData.AlertAllowCookiesText = domainData.AlertAllowCookiesText;
    bannerData.BannerShowRejectAllButton = domainData.BannerShowRejectAllButton;
    bannerData.BannerRejectAllButtonText = domainData.BannerRejectAllButtonText;
    bannerData.ShowBannerCookieSettings = commonData.ShowBannerCookieSettings;
    bannerData.BContinueColor = commonData.BContinueColor;
    bannerData.closeButton = mobileData.bannerData.buttons.closeButton;
    bannerData.AlertMoreInfoText = domainData.AlertMoreInfoText;
    bannerData.styleData = getBannerStyleData();
    bannerData.BannerDPDTitle = domainData.BannerDPDTitle
    bannerData.BannerDPDDescription = domainData.BannerDPDDescription
    bannerData.BannerIABPartnersLink = domainData.BannerIABPartnersLink
    bannerData.showBannerCloseButton = domainData.showBannerCloseButton;
    bannerData.BannerAdditionalDescription = domainData.BannerAdditionalDescription;
    bannerData.BannerAdditionalDescPlacement = domainData.BannerAdditionalDescPlacement;
    bannerData.BannerSettingsButtonDisplayLink = domainData.BannerSettingsButtonDisplayLink;
    bannerData.isIAB = isIAB2();
    return bannerData;
}

function getPreferenceCenterData() {
    const pcData = {};
    const sdkData = getOTSDKData();
    if (!sdkData || (Object.keys(sdkData).length === 0)) {
        return pcData;
    }
    const domainData = sdkData.culture.DomainData;
    const commonData = sdkData.culture.CommonData;
    const OTTData = sdkData.culture.OTTData;
    const MobileData = sdkData.culture.MobileData;
    pcData.OptanonLogo = commonData.OptanonLogo;
    pcData.MainText = domainData.MainText;
    pcData.MainInfoText = domainData.MainInfoText;
    pcData.PreferenceCenterConfirmText = domainData.PreferenceCenterConfirmText;
    pcData.ConfirmText = domainData.ConfirmText;
    pcData.PCenterShowRejectAllButton = domainData.PCenterShowRejectAllButton;
    pcData.PCenterRejectAllButtonText = domainData.PCenterRejectAllButtonText;
    pcData.styleData = getPCStyleData();
    pcData.VendorListText = domainData.VendorListText;
    pcData.PCIABVendorsText = domainData.PCIABVendorsText;
    pcData.BannerIABPartnersLink = domainData.BannerIABPartnersLink;
    pcData.ShowPreferenceCenterCloseButton = domainData.ShowPreferenceCenterCloseButton;
    pcData.AlwaysActiveText = domainData.AlwaysActiveText;
    pcData.BLegitInterestText = commonData.BLegitInterestText;
    pcData.Groups = getPurposesList();
    pcData.isIAB = isIAB2();
    pcData.LegIntSettings = getLegIntSettings();
    pcData.BConsentText = commonData.BConsentText;
    pcData.activeText = OTTData.preferenceCenterData.purposeList.ActiveText;
    pcData.inactiveText = OTTData.preferenceCenterData.purposeList.InactiveText;
    pcData.subCategoryHeaderText = OTTData.preferenceCenterData.purposeList.SubCategoryHeaderText;
    pcData.PCGoogleVendorsText = MobileData.preferenceCenterData.googleVendors.general.text;
    pcData.UseGoogleVendors = MobileData.preferenceCenterData.googleVendors.general.show;
    pcData.showParentToggle = false;
    pcData.showPartnersIAB = false;
    OTSDK_logger("Preference center is called");
    return pcData
}

function getVendorPageData() {
    const vendorPage = {};
    const sdkData = getOTSDKData();

    if (!sdkData || (Object.keys(sdkData).length === 0)) {
        return vendorPage;
    }

    const domainData = sdkData.culture.DomainData;
    const commonData = sdkData.culture.CommonData;
    const OTTData = sdkData.culture.OTTData;
    vendorPage.OptanonLogo = commonData.OptanonLogo;
    vendorPage.styleData = getPCStyleData();
    vendorPage.LegIntSettings = getLegIntSettings();
    vendorPage.PCenterVendorsListText = domainData.PCenterVendorsListText; //vendor page title
    vendorPage.PCenterViewPrivacyPolicyText = domainData.PCenterViewPrivacyPolicyText;
    vendorPage.PCenterAllowAllConsentText = domainData.PCenterAllowAllConsentText;
    vendorPage.VendorListNonCookieUsage = domainData.PCenterVendorListNonCookieUsage;
    vendorPage.VendorListLifespan = domainData.PCenterVendorListLifespan; // Lifepsan
    vendorPage.LifespanTypeText = domainData.LifespanTypeText; // Session
    vendorPage.VendorListLifespanDay = domainData.PCenterVendorListLifespanDay;
    vendorPage.VendorListLifespanDays = domainData.PCenterVendorListLifespanDays;
    vendorPage.VendorListLifespanMonth = domainData.PCenterVendorListLifespanMonth;
    vendorPage.VendorListLifespanMonths = domainData.PCenterVendorListLifespanMonths;
    vendorPage.ConsentPurposesText = commonData.BConsentPurposesText;
    vendorPage.SpecialPurposesText = commonData.BSpecialPurposesText;
    vendorPage.LIPurposesText = commonData.BLegitimateInterestPurposesText;
    vendorPage.FeaturesText = commonData.BFeaturesText;
    vendorPage.SpecialFeaturesText = commonData.BSpecialFeaturesText;
    vendorPage.BConsentText = commonData.BConsentText;
    vendorPage.BLegitInterestText = commonData.BLegitInterestText;
    vendorPage.VendorListDisclosure = domainData.PCenterVendorListDisclosure;
    vendorPage.VendorListStorageIdentifier = domainData.PCenterVendorListStorageIdentifier;
    vendorPage.VendorListStorageType = domainData.PCenterVendorListStorageType;
    vendorPage.VendorListStorageDomain = domainData.PCenterVendorListStorageDomain;
    vendorPage.VendorListStoragePurposes = domainData.PCenterVendorListStoragePurposes;
    vendorPage.PreferenceCenterConfirmText = domainData.PreferenceCenterConfirmText;
    vendorPage.ConfirmText = domainData.ConfirmText;
    vendorPage.PCenterShowRejectAllButton = domainData.PCenterShowRejectAllButton;
    vendorPage.PCenterRejectAllButtonText = domainData.PCenterRejectAllButtonText;
    vendorPage.PCenterClearFiltersText = domainData.PCenterClearFiltersText;
    vendorPage.showFilter = false;
    vendorPage.activeText = OTTData.preferenceCenterData.purposeList.ActiveText;
    vendorPage.inactiveText = OTTData.preferenceCenterData.purposeList.InactiveText;
    vendorPage.searchNoResultsFoundText = OTTData.vendorListData.general.searchNoResultsFoundText
    vendorPage.iabGroups = getIabGroups();
    vendorPage.PCGoogleVendorsText = domainData.PCGoogleVendorsText;
    OTSDK_logger("vendorPage is called");
    return vendorPage;
}

function setupUI(view) {
    const sdkData = getOTSDKData();
    if (!sdkData || (Object.keys(sdkData).length === 0)) {
        OTSDK_logger("SDK data is null");
        return;
    }

    const showBanner = shouldShowBanner();

    if (showBanner && view === "banner") {
        OTSDK_logger("showBanner -> " + showBanner);
        localStorage.setItem("OneTrust_didShowBanner", true);
        localStorage.setItem("OneTrust_BannerShownTime", parseInt(new Date().getTime() / 1000));
        location.href = "OTPublishersSDK/views/banner.html";

    } else if (showBanner && view === "preferencecenter") {
        OTSDK_logger("onShowpreference called");
        location.href = "OTPublishersSDK/views/PreferenceCenter.html";

    } else {
        OTSDK_logger("setupUI - no nav because no matching rules");

    }

}

// export function OTSDK_showBannerUI() {
//     const sdkData = getOTSDKData();
//     if (!sdkData || (Object.keys(sdkData).length === 0)) {
//         OTSDK_logger("SDK data is null");
//         return;
//     }
//     OTSDK_logger("onShowbanner called");
//     localStorage.setItem("OneTrust_didShowBanner", true);
//     localStorage.setItem("OneTrust_BannerShownTime", parseInt(new Date().getTime() / 1000));
//     location.href = "OTPublishersSDK/views/banner.html";
// }


// export function OTSDK_showPreferenceCenterUI() {
//     OTSDK_logger("onShowpreference called");
//     var sdkData = getOTSDKData();
//     if (!sdkData || (Object.keys(sdkData).length === 0)) {
//         OTSDK_logger("SDK data is null");
//         return;
//     }
//     location.href = "OTPublishersSDK/views/PreferenceCenter.html";
// }

function OTSDK_logger(data) {
    let sessionLogs;
    if (sessionStorage.getItem("sessionLogs")) {
        sessionLogs = sessionStorage.getItem("sessionLogs") + "\n" + "[" + new Date().toLocaleTimeString() + "] " + data;
    } else {
        sessionLogs = "[" + new Date().toLocaleTimeString() + "] " + data;
    }
    sessionStorage.setItem("sessionLogs", sessionLogs);
    // console.clear();
    // console.log(sessionStorage.getItem("sessionLogs"));
}

// ////////////////////////////
//  PRIVATE METHODS
//////////////////////////////////////

function geteTag() {
    return ''; // <-- revisit when we have a solution for handling 304's
    // if (getOTSDKData() === null) { return ""; }
    // let eTag = getOTSDKData()["profile"]["sync"]["eTag"];
    // if (eTag === null) { eTag = ''; }
    // return eTag;
}


function getGroupIDFromPurposeID(purposeID, data) {

    const records = data["culture"]["DomainData"]["Groups"];

    for (const recordID in records) {
        const record = records[recordID];
        const thisRecordPurposeId = record["PurposeId"];
        if (purposeID.toLowerCase() === thisRecordPurposeId.toLowerCase()) {
            return record["CustomGroupId"];
        }
    }

}

function translateSyncStatusValue(serverValue, data) {
    switch (serverValue) {
        case "ACTIVE":
            return "active";
        case "ALWAYS_ACTIVE":
            return "always active";
        case "NO_CONSENT":
            const vendorConsentModel = data["culture"]["DomainData"]["VendorConsentModel"];
            const defaultConsentStatus = (vendorConsentModel.toLowerCase() === "opt-out");  // opt-out = ON by default
            return defaultConsentStatus ? "active" : "inactive";
        case "PENDING":
        case "OPT_OUT":
        case "EXPIRED":
        case "WITHDRAWN":
            return "inactive";
    }
}

/**
 * @return {boolean}
 */
function isIAB2() {

    const sdkData = getOTSDKData();
    // ///////////////////////////////////////////////
    // Make Sure We Have Data To Work With
    // ///////////////////////////////////////////////
    if (!sdkData) {
        return false;
    }

    return sdkData["domain"]["ruleDetails"]["type"] === 'IAB2';
}


/**
 * @return {boolean}
 */
function allPurposesUpdatedAfterSync() {

    let answer = false;

    const allPurposesUpdatedAfterSync = getOTSDKData()["profile"]["sync"]["allPurposesUpdatedAfterSync"];
    if (allPurposesUpdatedAfterSync) {
        answer = allPurposesUpdatedAfterSync;
    }

    return answer;
}


/**
 * @return {boolean}
 */
function didReconsentFrequencyDaysExpire() {

    const lastLocalConsentDate = localStorage.getItem("OneTrust_lastConsentDate");
    if (lastLocalConsentDate) {

        const ReconsentFrequencyDays = getOTSDKData()["culture"]["DomainData"]["ReconsentFrequencyDays"];
        if (ReconsentFrequencyDays != null) {

            const date1 = new Date(parseFloat(lastLocalConsentDate));
            const date2 = new Date();
            const difference = date2.getTime() - date1.getTime();
            const daysOld = Math.ceil(difference / (1000 * 3600 * 24));

            if (daysOld > ReconsentFrequencyDays) {
                return true;
            }

        }
    }

    return false;

}


/**
 * @return {boolean}
 */
function lastReconsentDatesMatch() {

    // ////////////////
    // returning false will show the banner
    // ////////////////

    const sdkData = getOTSDKData();
    if (!sdkData) {
        throw "YOU MUST FIRST INIT OTSDK BEFORE CALLING THIS FUNCTION";
    }

    let answer = true;

    const serverlLastReconsentDate = sdkData["culture"]["DomainData"]["LastReconsentDate"];
    if (serverlLastReconsentDate && serverlLastReconsentDate.toString().trim().length > 0) {
        const lastLocalConsentDate = localStorage.getItem("OneTrust_lastConsentDate");
        if (lastLocalConsentDate) {
            answer = !(parseFloat(serverlLastReconsentDate) > parseFloat(lastLocalConsentDate));
        }
    }

    // no rules match, so return the default value for this function
    return answer;

}


async function updateLastConsentDate() {

    let lastConsentDate = new Date().getTime().toString();
    localStorage.setItem("OneTrust_lastConsentDate", lastConsentDate);
    writeCCPAString();

    // we only need to write the tc string here, if we did not already do so when sending to OT servers.
    //if (!getOTSDKData()["DomainData"]["IsConsentLoggingEnabled"]) { writeTCString();}

    // we store this because shouldShowBanner needs to determine category changes between launches. mod-5634/5636.
    const validGroupIDs = []; getValidGroup().forEach(function (gd) { validGroupIDs.push(gd.CustomGroupId); });
    localStorage.setItem("OneTrust_categoriesAvailableLastInteraction", JSON.stringify(validGroupIDs));

}

function getValuesForTCFFromConsentProfile(recordType, fieldName) {

    let idParts;
    let item;
    let CustomGroupId;
    const answer = [];
    const groupsArray = getPurposesList();

    if (groupsArray == null) { return answer; }

    for (const recordID in groupsArray) {

        item = groupsArray[recordID];

        if (item.Type.toUpperCase() === recordType) {
            if (item[fieldName] && (item[fieldName].toString() === 'always active' || item[fieldName].toString() === 'active')) {
                CustomGroupId = item["CustomGroupId"].toString();
                idParts = CustomGroupId.split('_');
                const lastItemInArray = idParts[idParts.length - 1].toString().trim();
                answer.push(parseInt(lastItemInArray));
            }

        }

    }

    return answer;

}


function getVendorConsentsArrayForTCF() {
    const answer = [];

    const vendorList = getVendorList();
    if (vendorList == null) { return answer; }

    const vendorsArray = vendorList["vendors"]
    if (vendorsArray == null) { return answer; }


    for (const recordID in vendorsArray) {
        const vendorRecord = vendorsArray[recordID];

        if (vendorRecord.shouldShowVendor
            && vendorRecord.shouldShowConsentToggleForVendor
            && vendorRecord.vendorConsentToggleIsOn) {
            answer.push(parseInt(vendorRecord["id"]));
        }

    }

    return answer;
}

function getVendorLiArrayForTCF() {
    const answer = [];

    const vendorList = getVendorList();
    if (vendorList == null) { return answer; }

    const vendorsArray = vendorList["vendors"]
    if (vendorsArray == null) { return answer; }


    for (const recordID in vendorsArray) {
        const vendorRecord = vendorsArray[recordID];

        if (vendorRecord.shouldShowVendor
            && vendorRecord.shouldShowLegitimateInterestToggleForVendor
            && vendorRecord.vendorLegitimateInterestToggleIsOn) {
            answer.push(parseInt(vendorRecord["id"]));
        }

    }

    return answer;
}




function writeTCStringCookie(tcString) {

    let d = new Date();
    d.setTime(d.getTime() + ((13 * 30) * 24 * 60 * 60 * 1000));

    const expires = "expires=" + d.toUTCString();
    const cname = "eupubconsent-v2"
    const sameSiteParam =
        new RegExp('^https:', 'i').test(window.location.protocol)
            ? 'Samesite=None; Secure'
            : 'Samesite=Lax';
    document.cookie = cname + "=" + tcString + ";" + expires + ";path=/;" + sameSiteParam;

}


function createTCFCoreString(iabPayload) {

    ////////////////////////////////////////
    //
    // Got the bit length from here:
    // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#publisher-purposes-transparency-and-consent
    //
    //////////////////////////////////////////


    let encodedItems = [];
    let strBinaryString = "";
    let b64 = "";
    let maxVendorId = 0;

    try {

        // localStorage.setItem("IABTCF_TCString", encodedString);
        localStorage.setItem("IABTCF_gdprApplies", iabPayload["gdprApplies"]);

        //' Version - 6 bits (0-5)
        encodedItems.push(encode_Integer(iabPayload["Version"], 6));

        //' Created - 36 bits (6-41)
        encodedItems.push(encode_Date(iabPayload["Created"], 36));

        //' LastUpdated - 36 bits (42-77)
        encodedItems.push(encode_Date(iabPayload["LastUpdated"], 36));

        //' CmpId - 12 bits (78-89)
        encodedItems.push(encode_Integer(iabPayload["CmpId"], 12));
        localStorage.setItem("IABTCF_CmpSdkID", iabPayload["CmpId"]);

        //' CmpVersion - 12 bits (90-101)
        encodedItems.push(encode_Integer(iabPayload["CmpVersion"], 12));
        localStorage.setItem("IABTCF_CmpSdkVersion", iabPayload["CmpVersion"]);

        //' ConsentScreen - 6 bits (102-107)
        encodedItems.push(encode_Integer(iabPayload["ConsentScreen"], 6));

        //' ConsentLanguage - 12 bits (108-119)
        encodedItems.push(encode_ConsentLanguage(iabPayload["ConsentLanguage"]));

        //' VendorListVersion - 12 bits (120-131)
        encodedItems.push(encode_Integer(iabPayload["VendorListVersion"], 12));

        //' TcfPolicyVersion - 6 bits (132-137) - Version of policy used within GVL
        encodedItems.push(encode_Integer(iabPayload["TcfPolicyVersion"], 6));
        localStorage.setItem("IABTCF_PolicyVersion", iabPayload["TcfPolicyVersion"]);

        //' IsServiceSpecific - 1 bits (138-138)  1 = service-specific storage, 0 = ‘global’ consensu.org shared storage
        encodedItems.push(encode_Integer(iabPayload["IsServiceSpecific"], 1));

        //' UseNonStandardStacks - 1 bits (139-139)  1 CMP used non-IAB standard stacks during consent gathering 0 IAB standard stacks were used
        encodedItems.push(encode_Integer(iabPayload["UseNonStandardStacks"], 1));
        localStorage.setItem("IABTCF_UseNonStandardStacks", iabPayload["UseNonStandardStacks"]);

        //' SpecialFeatureOptIns - 12 bits (140-151)  One bit for each Special Feature: 1 = Opted in, 0 = Not opted in
        encodedItems.push(encode_FromItemsLookup(iabPayload["SpecialFeatureOptins"], 12));
        localStorage.setItem("IABTCF_SpecialFeaturesOptIns", encodedItems[encodedItems.length - 1]);


        //' PurposesConsent - 24 bits (152-175)  One bit for each Purpose: 1 = Consent,  0 = No Consent
        encodedItems.push(encode_FromItemsLookup(iabPayload["PurposesConsent"], 24));
        localStorage.setItem("IABTCF_PurposeConsents", encodedItems[encodedItems.length - 1]);
        localStorage.setItem("IABTCF_PublisherConsent", encodedItems[encodedItems.length - 1]); //? not sure about this one


        //' PurposesLITransparency - 24 bits (176-199)
        // One bit for each Purpose: 1 = legitimate interest established,
        // 0 = legitimate interest was NOT established or it was established but user exercised their “Right to Object” to the Purpose.
        encodedItems.push(encode_FromItemsLookup(iabPayload["PurposesLITransparency"], 24));
        localStorage.setItem("IABTCF_PurposeLegitimateInterests", encodedItems[encodedItems.length - 1]);
        localStorage.setItem("IABTCF_PublisherLegitimateInterests", encodedItems[encodedItems.length - 1]); //? not sure about this one


        //' PurposeOneTreatment 1 bit (200-200) 1 = Purpose 1 was NOT disclosed at all,  0 = Purpose 1 was disclosed commonly as consent as expected by the Policies.
        encodedItems.push(encode_Integer(iabPayload["PurposeOneTreatment"], 1));
        localStorage.setItem("IABTCF_PurposeOneTreatment", iabPayload["PurposeOneTreatment"]);


        //' PublisherCC 12 bit (201-210) The country code of the country that determines legislation of reference. Commonly, this corresponds to the country in which the publisher’s business entity is established.
        encodedItems.push(encode_PublisherCountryCode(iabPayload["PublisherCC"]));
        localStorage.setItem("IABTCF_PublisherCC", iabPayload["PublisherCC"]);


        //'//////////////////////////////
        // Vendor Consent Section
        //'//////////////////////////////

        //' MaxVendorId - 16 bits
        maxVendorId = getMaxVendorID(iabPayload["VendorConsents"]);
        encodedItems.push(encode_Integer(maxVendorId, 16));

        //' IsRangeEncoding 1 bit - 1 Range, 0 BitField
        encodedItems.push(encode_Integer(0, 1));

        //' BitField
        //encodedItems.Add("01");

        encodedItems.push(encode_FromItemsLookup(iabPayload["VendorConsents"], maxVendorId));
        localStorage.setItem("IABTCF_VendorConsents", encodedItems[encodedItems.length - 1]);



        //'//////////////////////////////////////////////////
        // Vendor Legitimate Interest Section
        //'//////////////////////////////////////////////////

        //' MaxVendorId - 16 bits
        maxVendorId = getMaxVendorID(iabPayload["VendorLegitimateInterest"]);
        encodedItems.push(encode_Integer(maxVendorId, 16));

        //' IsRangeEncoding 1 bit - 1 Range, 0 BitField
        encodedItems.push(encode_Integer(0, 1));

        //' BitField
        //encodedItems.Add("01000101");
        encodedItems.push(encode_FromItemsLookup(iabPayload["VendorLegitimateInterest"], maxVendorId));
        localStorage.setItem("IABTCF_VendorLegitimateInterests", encodedItems[encodedItems.length - 1]);



        ////////////////////////////////////////////////////
        // Publisher Restrictions
        ////////////////////////////////////////////////////
        //' NumPubRestrictions - 12 bits - Number of restriction records to follow. Value is required even if it is 0
        const organizedPublisherRestrictions = organizePublisherRestrictions(iabPayload["PublisherRestrictions"]);
        encodedItems.push(encode_Integer(organizedPublisherRestrictions.length, 12));
        localStorage.setItem("IABTCF_PublisherRestrictions", encodedItems[encodedItems.length - 1]);

        // PUBLISHER RESTRICTIONS SECTION
        if (organizedPublisherRestrictions.length > 0) {
            encodeOrganizedPublisherRestrictions(organizedPublisherRestrictions, encodedItems);
        }

        // WRITE PUBLISHER RESTRICTIONS IABTCF_PublisherRestrictions{ID} TO DISK
        const maxVendorIDFromVendorList = iabPayload["maxVendorIDFromVendorList"];
        write_IABTCF_PublisherRestrictions_toDisk(iabPayload["PublisherRestrictions"], maxVendorIDFromVendorList);


        ////////////////////////////////////////////////////////////////////////////////////////////////
        // not sure why I need this, but unless a pad the end with 12 bytes it doesnt work!
        ////////////////////////////////////////////////////////////////////////////////////////////////
        encodedItems.push(encode_Integer(0, 12));


        ////////////////////////////////
        // encode the string
        ////////////////////////////////

        strBinaryString = encodedItems.join('');
        b64 = convertBinaryStringToBase64(strBinaryString);


        ////////////////////////////////
        // Return The Answer
        ////////////////////////////////
        OTSDK_logger("IAB TCF v2 Core ->" + b64);

        return b64;


    }
    catch (ex) {
        throw ex;
    }


};


function createTCFPublisherTC(iabPayload) {

    /////////////////
    // Global - A TC String in this context is saved globally and is shared by CMPs running on sites across the web;
    // When stored globally, they must NOT contain Publisher restrictions or a Publisher TC segment but they may contain a DisclosedVendors segment.
    /////////////////

    const encodedItems = [];
    let strBinaryString = "";
    let b64 = "";
    let numCustomPurposes = 0;


    try {


        //' SegmentType - 3 bits,  3 = PublisherTC
        encodedItems.push(encode_Integer(3, 3));

        //' PubPurposesConsent - 24 bits
        // ' One bit for each Purpose: 1 Consent. 0 No Consent
        encodedItems.push(encode_FromItemsLookup(iabPayload["PurposesConsent"], 24));


        //' PubPurposesLITransparency - 24 bits
        // ' One bit for each Purpose: 1 = legitimate interest established,  0 = legitimate interest was NOT established or it was established but user exercised their “Right to Object” to the Purpose
        encodedItems.push(encode_FromItemsLookup(iabPayload["PurposesLITransparency"], 24));


        //' NumCustomPurposes - 6 bits
        //' Custom purpose IDs are numbered 1 to NumberCustomPurposes. Custom purposes will be defined by the publisher and displayed to a user in a CMP user interface.
        //' If the publisher does not use any Custom Purposes, this field is set to 0 and the following two fields will be omitted.
        numCustomPurposes = iabPayload["NumCustomPurposes"];
        encodedItems.push(encode_Integer(numCustomPurposes, 6));

        if (numCustomPurposes > 0) {
            encodedItems.push(encode_FromItemsLookup(iabPayload["CustomPurposesConsent"], numCustomPurposes));
            localStorage.setItem("IABTCF_PublisherCustomPurposesConsents", encodedItems[encodedItems.length - 1]);

            encodedItems.push(encode_FromItemsLookup(iabPayload["CustomPurposesLITransparency"], numCustomPurposes));
            localStorage.setItem("IABTCF_PublisherCustomPurposesLegitimateInterests", encodedItems[encodedItems.length - 1]);

        }
        else {
            localStorage.setItem("IABTCF_PublisherCustomPurposesConsents", "");
            localStorage.setItem("IABTCF_PublisherCustomPurposesLegitimateInterests", "");

        }


        strBinaryString = encodedItems.join('');


        ////////////////////////////////////////////////////////////////////////////////////////////////
        // not sure why I need this, but unless a pad with equal length, it doesnt work
        ////////////////////////////////////////////////////////////////////////////////////////////////
        encodedItems.push(encode_Integer(0, strBinaryString.length));

        strBinaryString = encodedItems.join('');

        ////////////////////////////////
        // encode the string
        ////////////////////////////////
        b64 = convertBinaryStringToBase64(strBinaryString);


        ////////////////////////////////
        // Return The Answer
        ////////////////////////////////
        OTSDK_logger("PublisherTC ->" + b64);
        return b64;

    }
    catch (ex) {
        throw ex;
    }

}


String.prototype.padLeft = function (totalWidth, paddingStr) {
    //return Array(n-String(this).length+1).join(str||'0')+this;
    return this.padStart(totalWidth, paddingStr);
}
String.prototype.padRight = function (totalWidth, paddingStr) {
    //return this + Array(n-String(this).length+1).join(str||'0');
    return this.padEnd(totalWidth, paddingStr);
}


function encode_Integer(theValue, toLength) {

    try {
        return parseInt(theValue).toString(2).padLeft(toLength, '0');
    }
    catch (ex) {
        throw ex;
    }

}


function encode_Date(aDate, toLength) {

    // encode this date 2017-11-07T19:15:55.4Z
    // seconds would be this: 15100821554
    // must end up like this: 001110000100000101000100000000110010


    //let epoch = new Date("1970-01-01T00:00:00.000Z");
    let totalSeconds = 0;
    let binaryString = null;

    try {
        //totalSeconds = parseInt(Math.abs(( aDate.getTime() - epoch.getTime() ) / 1000).toString());
        totalSeconds = parseInt((aDate.getTime() / 100).toString())
        binaryString = totalSeconds.toString(2).padLeft(toLength, '0');
        return binaryString;

    } catch (ex) {
        throw ex;
    }

}


function encode_ConsentLanguage(theValue) {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let idx = 0;
    let firstLetter = null;
    let secondLetter = null;

    try {

        if (theValue.toString().trim().length !== 2) { throw "consent language must be length of two characters"; }

        idx = alphabet.indexOf(theValue.charAt(0).toUpperCase());
        firstLetter = encode_Integer(idx, 6);

        idx = alphabet.indexOf(theValue.charAt(1).toUpperCase());
        secondLetter = encode_Integer(idx, 6);

        return firstLetter.concat(secondLetter);

    } catch (ex) {
        throw ex;
    }

}



function encode_FromItemsLookup(items, toLength) {

    const answer = [];
    let lookupValue = null;
    let bitVal = null;

    try {

        for (let i = 0; i < toLength; i++) {
            lookupValue = (i + 1).toString();

            bitVal = "0";

            for (let key in items) {
                const item = String(items[key]);
                if (item === lookupValue) {
                    bitVal = "1";
                    break;
                }
            }

            answer.push(bitVal);

        }

        return answer.join('');
    }
    catch (ex) {
        throw ex;
    }

}

function encode_PublisherCountryCode(theValue) {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let idx = 0;
    let firstLetter = null;
    let secondLetter = null;

    try {


        if (theValue.toString().trim().length !== 2) { throw "publisher country code must be length of two characters"; }

        idx = alphabet.indexOf(theValue.charAt(0).toUpperCase());
        firstLetter = encode_Integer(idx, 6);

        idx = alphabet.indexOf(theValue.charAt(1).toUpperCase());
        secondLetter = encode_Integer(idx, 6);

        return firstLetter.concat(secondLetter);

    }
    catch (ex) {
        throw ex;
    }

}


function getMaxVendorID(items) {

    let answer = 0;
    let item;

    try {

        for (let i = 0; i < items.length; i++) {

            item = parseInt(items[i]);
            if (item > answer) { answer = item; }
        }

        return answer;
    }
    catch (ex) {
        throw ex;
    }

}


function organizePublisherRestrictions(publisherRestrictions) {

    // I need to store it like this... purpose / restrictionType / [VendorIDs]
    // but OT gives me that data like this... purpose / VendorID / restrictionType
    // so... transform the OT data in such a way that I can use it in a loop

    const answer = [];
    const temp = [];

    const publisherRestrictionskeys = Object.keys(publisherRestrictions);

    for (const index in publisherRestrictionskeys) {
        const purposeID = publisherRestrictionskeys[index];

        let purposeRecord = {};
        purposeRecord["purposeID"] = purposeID;
        purposeRecord["0"] = [];
        purposeRecord["1"] = [];
        purposeRecord["2"] = [];

        const vendorDict = publisherRestrictions[purposeID];
        const vendorIDs = Object.keys(vendorDict);

        for (const index2 in vendorIDs) {
            const vendorID = vendorIDs[index2];
            const restrictionTypeForVendor = parseInt(vendorDict[vendorID]);
            if (restrictionTypeForVendor >= 0 && restrictionTypeForVendor <= 2) {
                const keyName = restrictionTypeForVendor.toString();
                purposeRecord[keyName].push(vendorID);
            }
        }

        temp.push(purposeRecord);

    }


    // /////////////////////////////////////////////////////////////////////
    // I need it to end up like this....  PurposeID, RestrictionType, List
    // /////////////////////////////////////////////////////////////////////
    let i;

    for (i = 0; i < temp.length; i++) {

        const purposeRecord = temp[i];
        const purposeID = purposeRecord["purposeID"];

        for (let j = 0; j < 3; j++) {
            const vendorsForRestriction = purposeRecord[j];
            if (vendorsForRestriction.length > 0) {
                let restrictionEntry = {};
                restrictionEntry["purposeID"] = purposeID;
                restrictionEntry["restrictionType"] = j;
                restrictionEntry["vendors"] = vendorsForRestriction;

                answer.push(restrictionEntry);
            }
        }

    }

    return answer;

}

function organizePublisherRestrictionsForQuickLookupByVendor(publisherRestrictions) {
    const answer = {};
    try{

    const publisherRestrictionsKeys = Object.keys(publisherRestrictions);
    if(publisherRestrictionsKeys.length === 0) { return answer; }
    else{
    for (const index in publisherRestrictionsKeys) {

        const purposeID = publisherRestrictionsKeys[index];
        const vendorDict = publisherRestrictions[purposeID];
        const vendorIDs = Object.keys(vendorDict);

        for (const index2 in vendorIDs) {

            const vendorID = vendorIDs[index2];
            const restrictionType = parseInt(vendorDict[vendorID]);

            if (restrictionType >= 0 && restrictionType <= 2) {
                const strVendorID = vendorID.toString();
                const strRestrictionType = restrictionType.toString();

                if (!answer.hasOwnProperty(strVendorID)) {
                    answer[strVendorID] = { '0': [], '1': [], '2': [] };
                }

                answer[strVendorID][strRestrictionType].push(parseInt(purposeID));

            }

        }

    }
     return answer;
}
   

    }catch(err){
      OTSDK_logger("publisher Restrictions error -> " + err.message);
      return answer;
    }
    
    

}


function encodeOrganizedPublisherRestrictions(organizedPublisherRestrictions, encodedItems) {

    // //////////////////////////////////////////////
    // Make sure we have data to work with
    // //////////////////////////////////////////////

    if (organizedPublisherRestrictions == null) { return; }
    if (organizedPublisherRestrictions.length === 0) { return; }


    // /////////////////////////////////////////////////////////////
    // FOR EACH Restriction Entry RECORD, WRITE THE TCF BITS
    for (const index in organizedPublisherRestrictions) {

        const restrictionEntry = organizedPublisherRestrictions[index];

        // PurposeID 6 bits - The Vendor’s declared Purpose ID that the publisher has indicated that they are overriding.
        const purposeID = parseInt(restrictionEntry["purposeID"]);
        encodedItems.push(encode_Integer(purposeID, 6));


        // RestrictionType 2 bits - 0 = Not Allowed, 1 =  Require Consent, 2 = Require Legitimate Interest
        const restrictionType = parseInt(restrictionEntry["restrictionType"]);
        encodedItems.push(encode_Integer(restrictionType, 2));


        // NumEntries - 12 bits
        const vendorRecords = restrictionEntry["vendors"];
        encodedItems.push(encode_Integer(vendorRecords.length, 12));


        // //////////////////////
        // for each vendor
        for (const index2 in vendorRecords) {

            const vendorID = vendorRecords[index2];

            // IsARange - 1 bit  - 1 Vendor ID range 0 Single Vendor ID
            encodedItems.push(encode_Integer(0, 1));

            // VendorId - 16 bits
            encodedItems.push(encode_Integer(parseInt(vendorID), 16));

        }

    }

}

function clearPubRestrictionsFromDisk() {

    localStorage.removeItem("IABTCF_PublisherRestrictions1");
    localStorage.removeItem("IABTCF_PublisherRestrictions2");
    localStorage.removeItem("IABTCF_PublisherRestrictions3");
    localStorage.removeItem("IABTCF_PublisherRestrictions4");
    localStorage.removeItem("IABTCF_PublisherRestrictions5");
    localStorage.removeItem("IABTCF_PublisherRestrictions6");
    localStorage.removeItem("IABTCF_PublisherRestrictions7");
    localStorage.removeItem("IABTCF_PublisherRestrictions8");
    localStorage.removeItem("IABTCF_PublisherRestrictions9");
    localStorage.removeItem("IABTCF_PublisherRestrictions10");
}

function write_IABTCF_PublisherRestrictions_toDisk(publisherRestrictions, maxVendorIDFromVendorList) {

    //OT gives me that data like this... purpose / VendorID / restrictionType

    // remove from disk any cached values
    clearPubRestrictionsFromDisk();

    // ///////////////////////////////////////////////////////////////////
    // for each purpose write IABTCF_PublisherRestrictions to disk
    // ///////////////////////////////////////////////////////////////////
    const publisherRestrictionskeys = Object.keys(publisherRestrictions);

    for (let iRecord = 0; iRecord < publisherRestrictionskeys.length; iRecord++) {

        const purposeID = publisherRestrictionskeys[iRecord];  // the each key in publisherRestrictions is a purposeID

        const IABTCF_PublisherRestrictions = [];
        for (let i = 0; i < maxVendorIDFromVendorList; i++) { IABTCF_PublisherRestrictions.push("_"); }


        const vendorDict = publisherRestrictions[purposeID];
        const vendorDictKeys = Object.keys(vendorDict);

        for (let i = 0; i < vendorDictKeys.length; i++) {
            const vendorID = vendorDictKeys[i]; // the each key in vendorDict is a VendorID
            const restrictionTypeForVendor = vendorDict[vendorID];

            const indexPosition = parseInt(vendorID) - 1;
            if (indexPosition >= 0 && indexPosition < IABTCF_PublisherRestrictions.length) {
                IABTCF_PublisherRestrictions[indexPosition] = restrictionTypeForVendor;
            }
        }

        const keyName = "IABTCF_PublisherRestrictions" + purposeID;
        const storeThis = IABTCF_PublisherRestrictions.join('');
        localStorage.setItem(keyName, storeThis);

    }


}


function convertBinaryStringToBase64(strBinaryString) {

    let intStrLength = 0;
    let intPadding = 0;
    let paddedBinaryString = "";
    let numOfBytes = 0;
    let bytes;
    let multiples = 8;

    //' make sure the string is multiples of 8
    intStrLength = strBinaryString.length;
    intPadding = parseInt((intStrLength / multiples).toString()) * multiples - intStrLength;
    paddedBinaryString = strBinaryString.padRight((intStrLength + intPadding), '0');

    //' convert the string to bytes
    numOfBytes = parseInt((paddedBinaryString.length / multiples).toString());
    bytes = new Uint8Array(numOfBytes);
    for (let i = 0; i < numOfBytes; i++) {
        let substring = paddedBinaryString.substr((multiples * i), multiples);
        let b1 = parseInt(substring, 2);
        if (b1 > 127) {
            b1 -= 256;
        }
        bytes[i] = b1;
    }

    let encodedString = btoa(String.fromCharCode.apply(null, bytes));
    encodedString = encodedString.replace(new RegExp('\\+', 'g'), '-');
    encodedString = encodedString.replace(new RegExp('/', 'g'), '_');
    encodedString = encodedString.replace(new RegExp('=', 'g'), '');

    return encodedString;

}

function getPurposeOneTreatment() {

    // as defined in MOB-5335
    // When ShowInPopup is = false for IABV2_1, we need to do the following:
    //      We should hide in PC view
    //      We should set IAB Purpose 1’s Consent to OFF (0) in the TCData and TCString
    //      We should set IABTCF_PurposeOneTreatment = 1 in SharedPreferences when use clicks acceptAll() or rejectAll()


    let defaultAnswer = 0;

    // if NOT IAB 2 Template, return the default answer
    if (!isIAB2()) { return defaultAnswer; }

    // Get the Purpose 1 group
    const IABV2_1 = getGroupByID("IABV2_1");

    // if I dont have the ShowInPopup data I need, return the default answer
    if (!IABV2_1 || !IABV2_1.ShowInPopup) { return defaultAnswer; }

    // get the ShowInPopup value for Purpose 1
    const ShowInPopup = IABV2_1["ShowInPopup"];

    // not disclosed to the user (PurposeOneTreatment = 1)
    if (!ShowInPopup) { return 1; }

    // if we got this far, return the default answer
    return defaultAnswer;

}

function getGroupByID(CustomGroupId) {

    const groups = getOTSDKData().culture.DomainData.Groups;

    for (const key in groups) {
        const group = groups[key];
        if (group.CustomGroupId === CustomGroupId) {
            return group;
        }
    }

    return null;

}



function getValidGroup() {
    const sdkData = getOTSDKData();
    const groups = sdkData.culture.DomainData.Groups;
    const gpValid = [];
    groups.forEach(function (gd) {
        const isParent = isParentGroup(gd.OptanonGroupId, groups);
        const storageKeyName = "OneTrust_CustomGroupId_" + gd.CustomGroupId;
        const liStorageKeyName = "OneTrust_CustomGroupId_LI_" + gd.CustomGroupId;
        if (gd.FirstPartyCookies.length > 0 || gd.IsIabPurpose || isParent) {
            if (localStorage.getItem(storageKeyName)) {
                gd.Status = localStorage.getItem(storageKeyName);
            }
            if (localStorage.getItem(liStorageKeyName)) {
                gd.HasLegIntOptOutStatus = localStorage.getItem(liStorageKeyName);
            }

            gd.isParent = isParent; //<-- in getSavedProfile(), we exclude parent groups, so we'll add this field to the record
            gpValid.push(gd);
        }
    });
    return gpValid
}




function isParentGroup(groupId, groups) {

    let isParent = false;
    groups.forEach(function (gd) {
        if (gd.Parent === groupId) {
            isParent = true;
        }
    });
    return isParent;
}


function getLegIntSettings() {
    const sdkData = getOTSDKData();
    const LegIntSettings = sdkData.culture.DomainData.LegIntSettings;
    let PAllowLI = null;
    if (LegIntSettings != null) {
        PAllowLI = LegIntSettings;
    }
    return PAllowLI;
}

function isTestApp() {
    const sdkData = getOTSDKData();
    const scriptType = sdkData.domain.ScriptType;
    return scriptType.toLowerCase() === "test";
}


function getIdForIabGrp(id) {
    if (id.indexOf('ISPV2_') > -1) { // Special purpose
        id = id.replace('ISPV2_', '');
    } else if (id.indexOf('IABV2_') > -1) { // Purpose
        id = id.replace('IABV2_', '');
    } else if (id.indexOf('IFEV2_') > -1) { // Feature
        id = id.replace('IFEV2_', '');
    } else if (id.indexOf('ISFV2_') > -1) { // Spcieal feature
        id = id.replace('ISFV2_', '');
    }
    return id;
}

function getIabGroups() {
    const sdkData = getOTSDKData();
    const groups = sdkData.culture.DomainData.Groups;
    const iabGrps = {
        purpose: {},
        sp: {},
        feature: {},
        sf: {}
    };
    groups.forEach(function (grp) {
        const iabGrpId = getIdForIabGrp(grp.CustomGroupId);
        const grpName = grp.GroupName;
        switch (grp.Type) {
            case "IAB2_PURPOSE":
                iabGrps.purpose[iabGrpId] = grpName;
                break;
            case "IAB2_SPL_PURPOSE":
                iabGrps.sp[iabGrpId] = grpName;
                break;
            case "IAB2_FEATURE":
                iabGrps.feature[iabGrpId] = grpName;
                break;
            case "IAB2_SPL_FEATURE":
                iabGrps.sf[iabGrpId] = grpName;
                break;
        }
    });
    return iabGrps;
}


function isCrossDevice() {

    // not sure if there is a better way, perhaps in the server JSON,
    // but as of now, I assume crossDevice is enables if I have a syncAuth

    const cached_OneTrust_sdk_keys_encoded = localStorage.getItem("OneTrust_sdk_keys");
    if (cached_OneTrust_sdk_keys_encoded) {
        const cached_OneTrust_sdk_keys = JSON.parse(atob(cached_OneTrust_sdk_keys_encoded));
        return (cached_OneTrust_sdk_keys.syncProfileAuth && cached_OneTrust_sdk_keys.syncProfileAuth.trim().length > 0);
    }

    return false;
}

function hasNewCategoriesSinceLastLocalInteraction() {

    const validGroupIDs = []; getValidGroup().forEach(function (gd) { validGroupIDs.push(gd.CustomGroupId); });
    let validGroupIDs_lastInteraction = localStorage.getItem("OneTrust_categoriesAvailableLastInteraction");

    if (validGroupIDs_lastInteraction) {
        validGroupIDs_lastInteraction = JSON.parse(validGroupIDs_lastInteraction);

        const newItems = [];
        const deletedItems = [];
        const diffItems = getDiffFromArray(validGroupIDs_lastInteraction, validGroupIDs);

        // figure out if these are new or deleted categories
        diffItems.forEach((value, index) => {
            if (validGroupIDs.indexOf(value) === -1) {
                deletedItems.push(value);
            } else {
                newItems.push(value);
            }
        });

        OTSDK_logger("New categories ->" + JSON.stringify(newItems));
        OTSDK_logger("Deleted categories  ->" + JSON.stringify(deletedItems));

        return newItems.length > 0;

    }

    return false;
}


function getDiffFromArray(array1, array2) {

    const spread = [...array1, ...array2];
    return spread.filter(el => {
        return !(array1.includes(el) && array2.includes(el));
    })

}


const sendDataIfAllowed = async (sendTheseRecordsToOneTrust, interactionType) => {
    const sdkData = getOTSDKData()["culture"];
    const domainData = getOTSDKData()["domain"];

    const isConsentLoggingEnabled = sdkData["DomainData"]["IsConsentLoggingEnabled"];
    if (!isConsentLoggingEnabled) {
        OTSDK_logger("Consent Logging NOT Enabled");
        return { "info": "Consent Logging NOT Enabled" };
    }


    const consentIntegration = sdkData["CommonData"]["ConsentIntegration"];
    const ConsentApi = consentIntegration["ConsentApi"];
    const RequestInformation = consentIntegration["RequestInformation"];

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("cache-control", "no-cache");


    const OneTrust_sdk_keys = JSON.parse(atob(localStorage.getItem("OneTrust_sdk_keys")));
    let isAnonymous = true;
    if (OneTrust_sdk_keys.shouldCreateProfile && localStorage.getItem("OneTrust_datasubjectID_known") === 'true') {
        isAnonymous = false;
    }

    OTSDK_logger("dataSubject isAnonymous ->" + isAnonymous.toString());

    // we send the tc string to OneTrust.
    const tcStringV2 = writeTCString();


    const body = {
        "requestInformation": RequestInformation,
        "identifier": getDataSubjectIdentifier(),
        "test": isTestApp(),
        "isAnonymous": isAnonymous,
        "tcStringV2": tcStringV2,
        "customPayload": {
            "Interaction": 1,
            "AddDefaultInteraction": true
        },
        "purposes": sendTheseRecordsToOneTrust,
        "dsDataElements": {},
        "syncGroup": domainData.SyncGroupId
    }

    // Advanced Analytics Rules
    if (sdkData["DomainData"]["AdvancedAnalyticsCategory"] && sdkData["DomainData"]["AdvancedAnalyticsCategory"].trim().length > 0) {

        // MOB-6427
        body.dsDataElements.UserAgent = navigator.userAgent;

        //MOB-6424
        body.dsDataElements.Country = getOTSDKData()["domain"]["countryCode"];

        //MOB-6422
        body.dsDataElements.InteractionType = interactionType;

    }



    OTSDK_logger("Consent request ->" + JSON.stringify(body));

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body)
    };

    const response = await fetch(ConsentApi, requestOptions)
        .catch(error => {
            throw error;
        });

    // check if response worked (no 404 errors etc...)
    if (!response.ok) {
        OTSDK_logger("response.statusText -> " + response.statusText);
        throw new Error(response.statusText);
    }


    // store the receipt
    localStorage.setItem("OneTrust_Receipt", JSON.stringify(response));
    localStorage.setItem("OneTrust_Receipt_Date", (new Date().getTime() / 1000).toString());

    return response.json();

}

function clearIABLocalPurposes() {
    const sdkData = getOTSDKData();
    const groups = sdkData.culture.DomainData.Groups;
    groups.forEach(function (gd) {
        const id = gd.CustomGroupId;
        if (gd.IsIabPurpose) {
            const storageKeyName = "OneTrust_CustomGroupId_" + id;
            const liStorageKeyName = "OneTrust_CustomGroupId_LI_" + id;
            if (localStorage.getItem(storageKeyName)) {
                localStorage.removeItem(storageKeyName);
            }
            if (localStorage.getItem(liStorageKeyName)) {
                localStorage.removeItem(liStorageKeyName);
            }
        }
    });

    // also clear any user modifications to the vendor list
    // clearIABLocalPurposes() is called before downloadVendorList()
    // which will repopulate the keys below with defaults.
    localStorage.removeItem("OneTrust_VendorList");
    localStorage.removeItem("OneTrust_vendorLIUserSelections");
    localStorage.removeItem("OneTrust_vendorConsentUserSelections");
    localStorage.removeItem("OneTrust_saveQueue_vendor");
    localStorage.removeItem("OneTrust_saveQueue_vendor_li");

    localStorage.removeItem("OneTrust_Google_VendorList");
    localStorage.removeItem("OneTrust_vendorGoogleConsentUserSelections");

}

function triggerConsentEv() {
    window.dispatchEvent(new CustomEvent('OneTrustGroupsUpdated', {
        detail: getSavedProfile()
    }));
}

let m_vendorSearchIndex;
let m_vendorSearchLastFieldName;
let m_vendorSearchLastSearchTerm;
let m_vendorSearchLastResults;

const filterVendorListBy = async (searchConfig) => {

    // searchConfig looks like: {fieldName:'name', searchTerm:'expo' } //

    // if we dont have a search term, return all the vendors.
    if (!searchConfig || !searchConfig.searchTerm || searchConfig.searchTerm.trim().length == 0){
        return getVendorList().vendors;
    }

    // clear searchIndex if search Field name changes.
    if (m_vendorSearchLastFieldName !== searchConfig.fieldName){
        m_vendorSearchLastFieldName = searchConfig.fieldName;
        m_vendorSearchIndex = null;
    }


    // if we dont already have a search index for this field, create one
    if (!m_vendorSearchIndex) {
        m_vendorSearchIndex = [];
        const vendors = getVendorList().vendors;
        const vendorsKeys = Object.keys(vendors);
        for(let i=0; i < vendorsKeys.length; i++){
            const vendorID = vendorsKeys[i]
            const fieldName = searchConfig.fieldName;
            const fieldValue = vendors[vendorID][fieldName].toLowerCase();
            m_vendorSearchIndex.push({"id":vendorID, fieldName:fieldValue });
        }
    }


    // reset results if search term startsWith changes
    const searchTerm = searchConfig.searchTerm.toLowerCase();
    if ( ! searchTerm.startsWith( m_vendorSearchLastSearchTerm ) ) {
        m_vendorSearchLastResults = m_vendorSearchIndex;
    }

    // remember search term
    m_vendorSearchLastSearchTerm = searchTerm;


    // perform the search on our ever shrinking list.  As they type, the m_vendorSearchLastResults gets smaller, and search gets quicker
    m_vendorSearchLastResults = m_vendorSearchLastResults.filter(indexRecord => indexRecord.fieldName.indexOf(searchTerm) !== -1)

    // return the answer, a dictionary containing the filtered vendors
    const answer = {};
    const vendors = getVendorList().vendors;
    m_vendorSearchLastResults.forEach(function (indexRecord) {
        const vendorID = indexRecord.id.toString();
        answer[vendorID] = vendors[vendorID];
    });

    return answer;

}

function OTSDK_performance_logger(metricEnum, startDate, stopDate) {

    let  strMessage = "unknown metricEnum";
    let secondBetweenTwoDate = 0;

    try {
        secondBetweenTwoDate = Math.abs((stopDate - startDate) / 1000);
        switch (metricEnum) {
            case 1: {strMessage = `Time taken for OT SDK setup data fetch: ${secondBetweenTwoDate} seconds.`; break;}
            case 2: {strMessage = `Time taken for IAB vendor list data setup: ${secondBetweenTwoDate} seconds.`; break;}
            case 3: {strMessage = `Time taken for Google vendor list data setup: ${secondBetweenTwoDate} seconds.`; break;}
            case 4: {strMessage = `Time taken for OT SDK data setup: ${secondBetweenTwoDate} seconds.`; break;}
        };

        OTSDK_logger("logExecutionTime -> " + strMessage.toString());

    }catch (e) {
        OTSDK_logger("logExecutionTime -> " + e.toString());

    }finally {
        strMessage = null;
        secondBetweenTwoDate = null;

    }


}

function OTBackButtonMode(backMode){
    var defaultBackMode = "";
    if(backMode === "DISMISS_BANNER" || backMode === "DEFAULT_CONSENT_AND_CLOSE_BANNER"){
        defaultBackMode = backMode;
    }
    localStorage.setItem("OneTrust_backButtonMode",defaultBackMode);
}

function getBannerBackMode(){
    return localStorage.getItem("OneTrust_backButtonMode");
}

function getBannerStyleData(){
    const sdkData = getOTSDKData();
    const domainData = sdkData.culture.DomainData;
    const commonData = sdkData.culture.CommonData;
    const mobileData = sdkData.culture.MobileData;
    const OTTData = sdkData.culture.OTTData;
    const OTTbuttons = OTTData.bannerData.buttons;
    // const OTTData = null;
    // const OTTbuttons = null;
    const styleData = {
        "textColor": "",
        "backgroundColor": "",
        "acceptbuttonColor": "",
        "acceptbuttonTextColor":"",
        "acceptbuttonFocusColor": "",
        "acceptbuttonTextFocusColor": "",
        "rejectbuttonColor": "",
        "rejectbuttonTextColor": "",
        "rejectbuttonFocusColor": "",
        "rejectbuttonTextFocusColor": "",
        "pcbuttonColor": "",
        "pcbuttonTextColor": "",
        "pcbuttonFocusColor": "",
        "pcbuttonTextFocusColor": "",
        "customCSS": commonData.BannerCustomCSS,
        "vendorLinkColor" : ""
    };
    styleData.textColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.textColor !== null && OTTData.bannerData.general.textColor !== "" ? OTTData.bannerData.general.textColor : commonData.TextColor;
    styleData.backgroundColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.backgroundColor !== null && OTTData.bannerData.general.backgroundColor !== "" ? OTTData.bannerData.general.backgroundColor : commonData.BackgroundColor;
    styleData.acceptbuttonColor = OTTbuttons !== null && OTTbuttons.acceptAll !== null && OTTbuttons.acceptAll.color !== null && OTTbuttons.acceptAll.color !== "" ? OTTbuttons.acceptAll.color : commonData.ButtonColor;
    styleData.acceptbuttonTextColor = OTTbuttons !== null && OTTbuttons.acceptAll !== null && OTTbuttons.acceptAll.textColor !== null && OTTbuttons.acceptAll.textColor !== "" ? OTTbuttons.acceptAll.textColor : commonData.ButtonTextColor;
    styleData.acceptbuttonFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusColor !== undefined && OTTData.bannerData.general.buttonFocusColor !== "" ? OTTData.bannerData.general.buttonFocusColor : commonData.ButtonColor;
    styleData.acceptbuttonTextFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusTextColor !== undefined && OTTData.bannerData.general.buttonFocusTextColor !== "" ? OTTData.bannerData.general.buttonFocusTextColor : commonData.ButtonTextColor;
    styleData.rejectbuttonColor = OTTbuttons !== null && OTTbuttons.rejectAll !== null && OTTbuttons.rejectAll.color !== null && OTTbuttons.rejectAll.color !== "" ? OTTbuttons.rejectAll.color : commonData.ButtonColor;
    styleData.rejectbuttonTextColor = OTTbuttons !== null && OTTbuttons.rejectAll !== null && OTTbuttons.rejectAll.textColor !== null && OTTbuttons.rejectAll.textColor !== "" ? OTTbuttons.rejectAll.textColor : commonData.ButtonTextColor;
    styleData.rejectbuttonFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusColor !== undefined && OTTData.bannerData.general.buttonFocusColor !== "" ? OTTData.bannerData.general.buttonFocusColor : commonData.ButtonColor;
    styleData.rejectbuttonTextFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusTextColor !== undefined && OTTData.bannerData.general.buttonFocusTextColor !== "" ? OTTData.bannerData.general.buttonFocusTextColor : commonData.ButtonTextColor;
    styleData.pcbuttonColor = OTTbuttons !== null && OTTbuttons.showPreferences !== null && OTTbuttons.showPreferences.color !== null && OTTbuttons.showPreferences.color !== "" ? OTTbuttons.showPreferences.color : commonData.BannerMPButtonColor;
    styleData.pcbuttonTextColor = OTTbuttons !== null && OTTbuttons.showPreferences !== null && OTTbuttons.showPreferences.textColor !== null && OTTbuttons.showPreferences.textColor !== "" ? OTTbuttons.showPreferences.textColor : commonData.BannerMPButtonTextColor;
    styleData.pcbuttonFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusColor !== undefined && OTTData.bannerData.general.buttonFocusColor !== "" ?OTTData.bannerData.general.buttonFocusColor : commonData.BannerMPButtonTextColor;
    styleData.pcbuttonTextFocusColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.general !== null && OTTData.bannerData.general.buttonFocusTextColor !== undefined && OTTData.bannerData.general.buttonFocusTextColor !== "" ? OTTData.bannerData.general.buttonFocusTextColor : commonData.BannerMPButtonColor;
    styleData.vendorLinkColor = OTTData !== null && OTTData.bannerData !== null && OTTData.bannerData.links !== undefined && OTTData.bannerData.links.vendorListLink !== undefined && OTTData.bannerData.links.vendorListLink.color !== null && OTTData.bannerData.links.vendorListLink.color !== "" ? OTTData.bannerData.links.vendorListLink.color : ""
    return styleData;
}

function getPCStyleData(){
    const sdkData = getOTSDKData();
    const commonData = sdkData.culture.CommonData;
    const OTTData = sdkData.culture.OTTData;
    const OTTpcdata = OTTData.preferenceCenterData;
    const OTTbuttons = OTTpcdata.buttons;
    // const OTTpcdata = null;
    // const OTTbuttons = null;
    const styleData = {
        "textColor": "",
        "backgroundColor": "",
        "buttonColor": "",
        "buttonTextColor": "",
        "buttonFocusColor": "",
        "buttonTextFocusColor": "",
        "activeColor" : "",
        "activeTextColor" : "",
        "acceptbuttonColor": "",
        "acceptbuttonTextColor":"",
        "acceptbuttonFocusColor": "",
        "acceptbuttonTextFocusColor": "",
        "rejectbuttonColor": "",
        "rejectbuttonTextColor": "",
        "rejectbuttonFocusColor": "",
        "rejectbuttonTextFocusColor": "",
        "pcbuttonColor": "",
        "pcbuttonTextColor": "",
        "pcbuttonFocusColor": "",
        "pcbuttonTextFocusColor": "",
        "customCSS": commonData.PCCustomCSS
    };
    styleData.textColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.textColor !== null && OTTpcdata.general.textColor !== "" ? OTTpcdata.general.textColor : commonData.PcTextColor;
    styleData.backgroundColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.backgroundColor !== null && OTTpcdata.general.backgroundColor !== "" ? OTTpcdata.general.backgroundColor : commonData.PcBackgroundColor;
    styleData.buttonColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.color !== null && OTTpcdata.menu.color !== "" ? OTTpcdata.menu.color:commonData.PcTextColor;
    styleData.buttonTextColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.textColor !== null && OTTpcdata.menu.textColor !== "" ? OTTpcdata.menu.textColor:commonData.PcBackgroundColor;
    styleData.buttonFocusColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.focusColor !== null && OTTpcdata.menu.focusColor !== "" ? OTTpcdata.menu.focusColor:commonData.PcButtonColor;
    styleData.buttonTextFocusColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.focusTextColor !== null && OTTpcdata.menu.focusTextColor !== "" ? OTTpcdata.menu.focusTextColor:commonData.PcButtonTextColor;
    styleData.activeColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.activeColor !== null && OTTpcdata.menu.activeColor !== "" ? OTTpcdata.menu.activeColor:commonData.PcButtonTextColor;
    styleData.activeTextColor = OTTpcdata !== null && OTTpcdata.menu !== undefined && OTTpcdata.menu.activeTextColor !== null && OTTpcdata.menu.activeTextColor !== "" ? OTTpcdata.menu.activeTextColor:commonData.PcButtonColor;
    styleData.acceptbuttonColor = OTTbuttons !== null && OTTbuttons.acceptAll !== null && OTTbuttons.acceptAll.color !== null && OTTbuttons.acceptAll.color !== "" ? OTTbuttons.acceptAll.color : commonData.PcButtonColor;
    styleData.acceptbuttonTextColor = OTTbuttons !== null && OTTbuttons.acceptAll !== null && OTTbuttons.acceptAll.textColor !== null && OTTbuttons.acceptAll.textColor !== "" ? OTTbuttons.acceptAll.textColor : commonData.PcButtonTextColor;
    styleData.acceptbuttonFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusColor !== undefined && OTTpcdata.general.buttonFocusColor !== "" ? OTTpcdata.general.buttonFocusColor : commonData.PcButtonColor;
    styleData.acceptbuttonTextFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusTextColor !== undefined && OTTpcdata.general.buttonFocusTextColor !== "" ? OTTpcdata.general.buttonFocusTextColor : commonData.PcButtonTextColor;
    styleData.rejectbuttonColor = OTTbuttons !== null && OTTbuttons.rejectAll !== null && OTTbuttons.rejectAll.color !== null && OTTbuttons.rejectAll.color !== "" ? OTTbuttons.rejectAll.color : commonData.PcButtonColor;
    styleData.rejectbuttonTextColor = OTTbuttons !== null && OTTbuttons.rejectAll !== null && OTTbuttons.rejectAll.textColor !== null && OTTbuttons.rejectAll.textColor !== "" ? OTTbuttons.rejectAll.textColor : commonData.PcButtonTextColor;
    styleData.rejectbuttonFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusColor !== undefined && OTTpcdata.general.buttonFocusColor !== "" ? OTTpcdata.general.buttonFocusColor : commonData.PcButtonColor;
    styleData.rejectbuttonTextFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusTextColor !== undefined && OTTpcdata.general.buttonFocusTextColor !== "" ? OTTpcdata.general.buttonFocusTextColor : commonData.PcButtonTextColor;
    styleData.pcbuttonColor = OTTbuttons !== null && OTTbuttons.showPreferences !== null && OTTbuttons.showPreferences.color !== null && OTTbuttons.showPreferences.color !== "" ? OTTbuttons.showPreferences.color : commonData.PcButtonColor;
    styleData.pcbuttonTextColor = OTTbuttons !== null && OTTbuttons.showPreferences !== null && OTTbuttons.showPreferences.textColor !== null && OTTbuttons.showPreferences.textColor !== "" ? OTTbuttons.showPreferences.textColor : commonData.PcButtonTextColor;
    styleData.pcbuttonFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusColor !== undefined && OTTpcdata.general.buttonFocusColor !== "" ?OTTpcdata.general.buttonFocusColor : commonData.PcButtonColor;
    styleData.pcbuttonTextFocusColor = OTTpcdata !== null && OTTpcdata.general !== null && OTTpcdata.general.buttonFocusTextColor !== undefined && OTTpcdata.general.buttonFocusTextColor !== "" ? OTTpcdata.general.buttonFocusTextColor : commonData.PcButtonTextColor;
    return styleData;
}

//MOB-7978; Automatic Reconsent override
const performAutomaticReconsentOverride = async () => {

    const data = OTCMP.getOTSDKData();
    if (data) {
        // How many days
        const ReconsentFrequencyDays = data["culture"]["DomainData"]["ReconsentFrequencyDays"];
        OTSDK_logger(`performAutomaticReconsentOverride -> Setting last consent date to today minus ${ReconsentFrequencyDays} days.`);

        // reset the date & save to disk
        const date = Date.now() - 1000 * 60 * 60 * 24 * ReconsentFrequencyDays;
        OTSDK_logger(`performAutomaticReconsentOverride -> New consent timestamp is now ${date}`);
        localStorage.setItem("OneTrust_lastConsentDate", date.toString());

        // restart the sdk
        const sdk_keys = JSON.parse(atob(localStorage.getItem("OneTrust_sdk_keys")));
        return await OTCMP.startSDK(sdk_keys);

    } else {
        OTSDK_logger("performAutomaticReconsentOverride -> There is no OneTrust Data!");
    }

}

const getConsentExpired = function(){
    const data = OTCMP.getOTSDKData();
    let consentExpired = false;
    if (data) {
        const profileStatusCode = data["status"]["profile"]["code"];
        if (profileStatusCode && profileStatusCode === 200) {
            const shouldShowBannerAsConsentExpired = data["profile"]["sync"]["shouldShowBannerAsConsentExpired"];
            consentExpired = shouldShowBannerAsConsentExpired;
        }
    }
    return consentExpired;
};

OTCMP = __webpack_exports__;
/******/ })()
;