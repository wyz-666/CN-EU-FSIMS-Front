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
    
}
