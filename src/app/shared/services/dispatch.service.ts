import { Injectable } from '@angular/core';
import { FirebaseService  } from './firebase.service';
import { IdGeneratorService } from './id-generator.service';
import { AuthService } from './auth.service';
import { Request, Dispatch} from '../model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor( public firebase: FirebaseService,
    public db: AngularFirestore,
    public authService: AuthService,
    public genService: IdGeneratorService,
    public alertService: AlertService) { }


  getAllRequestofRequester() {
    const filters = {
      value1: 'requesterID',
      expression1: '==',
      value2: this.authService.requesterID(),
      value3: 'isArchived',
      expression2: '==',
      value4: false,
    };
    return this.firebase.getAllData(Request, 2 , filters);
  }

  getAllDispatchofRequester() {
    const filters = {
      value1: 'requesterID',
      expression1: '==',
      value2: this.authService.requesterID(),
      value3: 'isArchived',
      expression2: '==',
      value4: false,
    };
    return this.firebase.getAllData(Dispatch, 2 , filters);
  }

  createRequest(values) {
    this.genService.generateID(Request).then(val => {
      this.db.collection<Request>(Request.collectionName).add({

      requestID: val.newID,
      requesterID: this.authService.requesterID(),
      fullName:  this.authService.userName(),
      dateRequested: new Date(),
      status: 'For Approval',
      isOrdered: false,
      isApproved: false,
      isArchived: false,
      num: val.newNum,

      patientName: values.patientName,
      hospitalName: values.hospitalName,
      patientDiagnosis: values.patientDiagnosis,
      patientBloodType: values.patientBloodType,
      patientBloodComponent: values.patientBloodComponent,
      patientBloodUnits: values.patientBloodUnits,
      patientDiagnosisPhotoUrl: values.patientDiagnosisPhotoUrl,

      dateCreated: new Date(),
      dateLastModified: new Date(),
      createdBy: this.authService.userName(),
      lastModifiedBy: this.authService.userName()
    })}).catch(error => {
      throw new Error('Error: Adding document:' + error);
    }).then( () => {
      this.alertService.showToaster(values.requestID+' Request Added' , { classname: 'bg-success text-light', delay: 10000 })
    })

  }

  updateRequest(id , values) {
    this.db.collection<Request>(Request.collectionName).doc(id).update({
      patientName: values.patientName,
      hospitalName: values.hospitalName,
      patientDiagnosis: values.patientDiagnosis,
      patientBloodType: values.patientBloodType,
      patientBloodComponent: values.patientBloodComponent,
      patientBloodUnits: values.patientBloodUnits,

      dateLastModified: new Date(),
      lastModifiedBy: this.authService.userName()
    }).catch(error => {
      throw new Error('Error: Updating document:' + error);
    }).then( () => {
      this.alertService.showToaster(values.requestID+' Modified' , { classname: 'bg-success text-light', delay: 10000 })
    });
  }

  updateFeedback(id, values) {
    this.db.collection<Dispatch>(Dispatch.collectionName).doc(id).update({
      isFeedback: true,
      feedback: values.feedback,

      dateLastModified: new Date(),
      lastModifiedBy: this.authService.userName()
    }).catch(error => {
      throw new Error('Error: Updating document:' + error);
    }).then( () => {
      this.alertService.showToaster(values.requestID+' Feedback Received, Thank you !' , { classname: 'bg-success text-light', delay: 10000 })
    });
  }

  archiveRequest(id) {
    return this.firebase.archiveOne(Request, id);
  }
}
