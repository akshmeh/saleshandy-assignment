"use client";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { CreditCard, UserCircle2 } from "lucide-react";

export default function ProfilePage(){
    const { user, addAddress, removeAddress, setDefaultAddress } = useUserStore();

  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newFullAddr, setNewFullAddr] = useState({
    name: '', street: '', city: '', state: '', postalCode: '', country: '', phone: ''
  });


    return (
        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="font-caveat font-semibold text-2xl md:text-[40px] text-text-fg tracking-tight mb-2">My Profile</h1>
            <p className="text-xs md:text-sm text-text-muted mb-8 leading-normal font-semibold">
              Manage shipping destinations, personal details, and verify transaction history records.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1">
                <div className="p-6 bg-white border border-brand-border rounded-primary text-center">
                  <div className="flex justify-center items-center relative w-24 h-24 rounded-full bg-brand-muted-bg overflow-hidden mx-auto mb-4 border border-brand-border">
                    {user.avatar ? <img src={user.avatar} alt="User Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />:
                    <UserCircle2 size={100} className="stroke-brand-blue" />}
                  </div>

                  <h3 className="font-caveat font-semibold text-text-fg text-sm">{user.firstName} {user.lastName}</h3>
                  <span className="font-matter text-[10px] text-text-muted block mb-4">{user.email}</span>

                  <span className="inline-block bg-brand-blue/5 text-brand-blue text-[10px] tracking-wider font-matter font-bold uppercase border border-brand-blue/15 rounded-chip px-3 py-1">
                    PRO MEMBER ✦
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                
                <div className="p-6 bg-white border border-brand-border rounded-primary">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-brand-border">
                    <h3 className="text-xs font-caveat font-semibold uppercase tracking-wide text-text-fg">
                      Dispatch Coordinates Address
                    </h3>
                    <button
                      id="profile-add-address-btn"
                      onClick={() => setIsAddingAddr(!isAddingAddr)}
                      className="text-xs font-semibold text-brand-blue hover:underline"
                    >
                      {isAddingAddr ? 'Collapse' : '+ Register Node'}
                    </button>
                  </div>

                  {isAddingAddr && (
                    <div className="p-4 bg-brand-muted-bg border border-brand-border rounded-card mb-6 space-y-3">
                      <h4 className="text-xs font-bold text-text-fg">Register New Logistics Address</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          placeholder="Node description (Home, Lab)..."
                          value={newFullAddr.name}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, name: e.target.value })}
                          className="col-span-2 px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Street address..."
                          value={newFullAddr.street}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, street: e.target.value })}
                          className="col-span-2 px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="City..."
                          value={newFullAddr.city}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, city: e.target.value })}
                          className="px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="State..."
                          value={newFullAddr.state}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, state: e.target.value })}
                          className="px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Postal zip code..."
                          value={newFullAddr.postalCode}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, postalCode: e.target.value })}
                          className="px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Country..."
                          value={newFullAddr.country}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, country: e.target.value })}
                          className="px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Phone coordinate..."
                          value={newFullAddr.phone}
                          onChange={(e) => setNewFullAddr({ ...newFullAddr, phone: e.target.value })}
                          className="col-span-2 px-3 py-2 bg-white border border-brand-border rounded text-xs outline-none"
                        />
                      </div>

                      <button
                        id="save-new-addr-btn"
                        type="button"
                        onClick={() => {
                          if (newFullAddr.name && newFullAddr.street && newFullAddr.city) {
                            addAddress(newFullAddr);
                            setIsAddingAddr(false);
                            setNewFullAddr({ name: '', street: '', city: '', state: '', postalCode: '', country: '', phone: '' });
                          }
                        }}
                        className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs rounded transition cursor-pointer"
                      >
                        Secure Save Node
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {user.addresses.map(addr => (
                      <div key={addr.id} className="p-4 border border-brand-border rounded-card relative">
                        
                        <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs text-text-fg">
                          <span>{addr.name}</span>
                          {addr.isDefault && (
                            <span className="text-brand-blue bg-brand-blue/5 border border-brand-blue/15 px-1.5 py-0.5 rounded text-[9px] font-matter font-bold tracking-wider">
                              DEFAULT SHIP
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-text-muted leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                        </p>
                        <p className="text-xs text-text-muted mt-1">Phone Node: {addr.phone}</p>

                        <div className="mt-3 flex gap-4 text-[10px] font-matter tracking-wider font-semibold">
                          {!addr.isDefault && (
                            <button 
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-brand-blue hover:underline"
                            >
                              SET AS DEFAULT
                            </button>
                          )}
                          <button 
                            onClick={() => removeAddress(addr.id)}
                            className="text-brand-red hover:underline"
                          >
                            DELETE NODE
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border border-brand-border rounded-primary">
                  <h3 className="text-xs font-caveat font-semibold uppercase tracking-wide text-text-fg mb-4 pb-2 border-b border-brand-border">
                    Registered payment networks
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-4 border border-brand-border rounded-card">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-text-muted" />
                        <div>
                          <strong className="text-text-fg font-semibold block">Visa Credit Card Ending</strong>
                          <span className="font-matter text-[10px] text-text-muted">**** 4242 (Exp 12/28)</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 font-matter font-bold tracking-wider rounded">
                        ACTIVE NETWORK
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
        </div>
    )
}