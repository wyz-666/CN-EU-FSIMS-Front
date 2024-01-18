export default class NodeService {

    getTreeTableNodes() {
        return fetch('data/treetablenodes.json').then(res => res.json()).then(d => d.root);
    }

    getTreeNodes() {
        return fetch('data/treenodes.json').then(res => res.json()).then(d => d.root);
    }

    getFeedHeavyMetalMap(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.feedHeavyMetalMappings)
    }

    getFeedHeavyMetalNormal(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.feedHeavyMetalNormal)
    }

    getFeedMycotoxinsMap(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.feedMycotoxinsMappings)
    }

    getFeedMycotoxinsNormal(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.feedMycotoxinsNormal)
    }

    getwaterRecordMap(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.waterRecordMappings)
    }

    getwaterRecordNormal(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.waterRecordNormal)
    }

    getenvironmentMap(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.environmentMappings)
    }

    getenvironmentNormal(){
        return fetch('data/pasture.json').then(res=>res.json()).then(d=>d.environmentNormal)
    }
    
    getShopDataMap(){
        return fetch('data/slaughter.json').then(res => res.json()).then(d=>d.shopDataMappings)
    }

    getShopDataMAX(){
        return fetch('data/slaughter.json').then(res => res.json()).then(d=>d.shopDataMax)
    }

    getShopDataMIN(){
        return fetch('data/slaughter.json').then(res => res.json()).then(d=>d.shopDataMIN)
    }
    
    getwaterQualityDataMap(){
        return fetch('data/slaughter.json').then(res => res.json()).then(d=>d.waterQualityDataMappings)
    }
    
    getwaterQualityDataMAX(){
        return fetch('data/slaughter.json').then(res => res.json()).then(d=>d.waterQualityDataMAX)
    }

}
